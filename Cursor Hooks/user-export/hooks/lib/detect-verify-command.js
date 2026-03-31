/**
 * Pick a verify command from repo evidence (no guessing beyond common manifests).
 */
const fs = require("fs");
const path = require("path");

function safeReadJson(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return null;
  }
}

function packageManager(projectDir) {
  if (fs.existsSync(path.join(projectDir, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(projectDir, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(projectDir, "bun.lockb"))) return "bun";
  return "npm";
}

function pickNpmScript(projectDir, scriptName) {
  const pkgPath = path.join(projectDir, "package.json");
  if (!fs.existsSync(pkgPath)) return null;
  const pkg = safeReadJson(pkgPath);
  if (!pkg || !pkg.scripts || !pkg.scripts[scriptName]) return null;
  const pm = packageManager(projectDir);
  const run = pm === "npm" ? "npm run" : `${pm} run`;
  return { shell: `${run} ${scriptName}`, cwd: projectDir };
}

/**
 * @returns {{ shell: string, cwd: string } | null}
 */
function detectVerifyCommand(projectDir) {
  const test = pickNpmScript(projectDir, "test");
  if (test) return test;
  const build = pickNpmScript(projectDir, "build");
  if (build) return build;

  if (fs.existsSync(path.join(projectDir, "go.mod"))) {
    return { shell: "go test ./...", cwd: projectDir };
  }
  if (fs.existsSync(path.join(projectDir, "Cargo.toml"))) {
    return { shell: "cargo test", cwd: projectDir };
  }
  const composerPath = path.join(projectDir, "composer.json");
  if (fs.existsSync(composerPath)) {
    const comp = safeReadJson(composerPath);
    if (comp && comp.scripts && comp.scripts.test) {
      return { shell: "composer test", cwd: projectDir };
    }
    if (fs.existsSync(path.join(projectDir, "phpunit.xml"))) {
      return { shell: "php vendor/bin/phpunit", cwd: projectDir };
    }
  }
  const pyproject = path.join(projectDir, "pyproject.toml");
  if (fs.existsSync(pyproject)) {
    const ini = fs.readFileSync(pyproject, "utf8");
    if (/\[tool\.pytest/.test(ini) || /pytest/.test(ini)) {
      return { shell: "pytest", cwd: projectDir };
    }
  }
  return null;
}

module.exports = { detectVerifyCommand, packageManager };
