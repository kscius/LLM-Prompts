# Cursor Rules Maker

This folder contains the necessary files to create a Custom Mode in Cursor AI.

## How to Create a Custom Mode in Cursor AI

Follow these steps to set up your custom mode:

### Step 1: Open Cursor Settings
1. Open Cursor AI
2. Click on the **Settings** icon (gear icon) in the bottom left corner, or press `Ctrl+,` (Windows/Linux) / `Cmd+,` (Mac)

### Step 2: Navigate to Custom Modes
1. In the Settings menu, navigate to **Features** or **AI** section
2. Look for **Custom Modes** or **Rules for AI** option
3. Click on **Add Custom Mode** or **Create New Mode**

### Step 3: Configure Your Custom Mode
1. **Name your mode**: Give it a descriptive name (e.g., "Custom Rules Mode")
2. **Add the prompt**: 
   - Open the `Prompt.md` file in this folder
   - Copy the entire contents of `Prompt.md`
   - Paste it into the **Prompt** or **Rules** field in the Custom Mode settings

### Step 4: Configure Model Settings
1. **Select the model**: Choose **Sonnet 4.5** from the model dropdown
2. **Disable RUN option**:
   - In the mode configuration, look for **Tool Permissions** or **Capabilities** section
   - Find the **RUN** option and **disable** it (uncheck or toggle off)
   - This prevents the AI from executing terminal commands automatically

### Step 5: Save and Activate
1. Click **Save** to save your custom mode configuration
2. The mode should now appear in your mode selector
3. Select it from the mode dropdown to activate it

### Step 6: Using the Custom Mode to Create Rules
1. **Select the Custom Mode**: Make sure your newly created custom mode is selected in the mode dropdown
2. **Initiate the rules creation**: In the chat interface, type the following phrase:
   ```
   create the rules
   ```
3. **Wait for the plan confirmation**: 
   - Cursor AI will analyze your codebase and propose a plan for creating rules
   - The AI will follow the phases defined in `Prompt.md`:
     - Phase 1: Forensic Analysis & Discovery (analysis only, no files created)
     - Phase 2: Plan & Propose (planning only, waiting for your approval)
4. **Review and approve the plan**:
   - Review the proposed plan that Cursor AI presents
   - Once you're satisfied with the plan, **explicitly approve it** by confirming in the chat
   - Only after your approval will Cursor AI proceed to Phase 3 and create the actual rule files

## File Structure

```
Cursor Rules Maker/
├── README.md          # This file - instructions for setup
└── Prompt.md          # The prompt/rules content for your custom mode
```

## Notes

- Make sure to copy the **entire content** from `Prompt.md` when setting up your custom mode
- The RUN option should be disabled to prevent automatic command execution
- Sonnet 4.5 model is recommended for best performance with custom rules
- You can edit `Prompt.md` and update your custom mode settings anytime

## Troubleshooting

- If you don't see the Custom Modes option, make sure you're using a version of Cursor that supports this feature
- If the prompt doesn't work as expected, verify that all content from `Prompt.md` was copied correctly
- Check that Sonnet 4.5 is available in your Cursor subscription plan

