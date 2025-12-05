# MTG Judge - AI Prompt

An expert Magic: The Gathering rules judge that transforms any LLM into a highest-level MTG Judge. This prompt provides accurate, comprehensive rulings based on the official Comprehensive Rules and Oracle card text.

## Overview

MTG Judge helps Magic: The Gathering players of all levels (from casual to competitive) understand and correctly apply game rules. It provides:
- Accurate rulings based on official Comprehensive Rules
- Card interaction explanations with Oracle text
- Step-by-step breakdowns of complex situations
- Tournament policy guidance
- Format-specific interactions (Commander, Modern, Legacy, etc.)

## Features

### 🎯 Expert Rules Knowledge

- **Comprehensive Rules Mastery**: Based on official MagicCompRules.txt
- **Oracle Text Accuracy**: Uses current, official card text from Gatherer/Scryfall
- **All Formats Supported**: Commander, Modern, Pioneer, Legacy, Vintage, Standard, and more
- **Tournament Rules**: Covers tournament policy, illegal actions, and accepted shortcuts

### 🔍 Card Interaction Analysis

Handles complex interactions including:
- Triggered, activated, and static abilities
- Replacement and prevention effects
- Continuous effects and the layer system
- Stack mechanics and priority
- Last Known Information (LKI)
- APNAP (Active Player/Nonactive Player) order

### 📚 Comprehensive Coverage

- **Game Zones**: Battlefield, exile, graveyard, hand, library, command zone, stack, etc.
- **Steps and Phases**: Turn structure, priority windows, cleanup steps
- **Commander Rules**: Command tax, commander damage, zone changes, death triggers
- **Continuous Effects**: Layer system, characteristic-changing effects, dependencies
- **State-Based Actions**: Timing and interactions

### 📊 Structured Responses

Every ruling includes clear sections:
1. **Summary** - Direct answer to the question
2. **Interaction** - Conceptual explanation of how cards/effects interact
3. **Step-by-Step** - Ordered sequence (priority, triggers, resolution, SBAs)
4. **Relevant Rules** - CR references that support the ruling

## How to Use

This prompt can be used with any LLM platform. Here are the most common ways:

### Option 1: Direct Copy-Paste (Universal)

1. Open `Prompt.md` in this folder
2. Copy the entire contents
3. Paste it into your LLM chat interface (ChatGPT, Claude, Gemini, etc.)
4. Ask your Magic rules questions
5. The AI will provide structured rulings with CR references

### Option 2: Custom Mode in Cursor AI

1. Open Cursor AI Settings (`Ctrl+,` or `Cmd+,`)
2. Navigate to **Custom Modes** or **Rules for AI**
3. Click **Add Custom Mode** or **Create New Mode**
4. **Name your mode**: "MTG Judge" or similar
5. **Add the prompt**:
   - Open `Prompt.md` in this folder
   - Copy the entire contents
   - Paste into the **Prompt** or **Rules** field
6. **Save** and activate the mode

### Option 3: System Prompt / Custom Instructions

- **ChatGPT**: Add to Custom Instructions or use as a system message
- **Claude**: Use in the system prompt field
- **Other platforms**: Add to system prompt or custom instructions section

### With Internet Access (Recommended)

For best results, use with LLMs that have internet access to query:
- **Gatherer**: https://gatherer.wizards.com/
- **Scryfall**: https://scryfall.com/
- **Scryfall API**: https://api.scryfall.com/cards/named?fuzzy=[card-name]

The AI will automatically use these sources to verify current Oracle text.

## Usage Examples

### Basic Card Interaction

```
User: "If I cast Counterspell targeting my opponent's Lightning Bolt, 
       can they respond with Red Elemental Blast?"

AI: 
## Summary
Yes, they can respond with Red Elemental Blast to counter your Counterspell.

## Interaction
Both spells are on the stack. When you cast Counterspell, your opponent 
gets priority and can cast Red Elemental Blast targeting Counterspell 
(a blue spell).

## Step-by-Step
1. Opponent casts Lightning Bolt
2. Lightning Bolt goes on the stack
3. You get priority, cast Counterspell targeting Lightning Bolt
4. Counterspell goes on the stack above Lightning Bolt
5. Opponent gets priority, casts Red Elemental Blast targeting Counterspell
6. Red Elemental Blast resolves, countering Counterspell
7. Lightning Bolt resolves normally

## Relevant Rules
- CR 608.2b: Spells resolve one at a time
- CR 117.3: Priority passes after casting a spell
```

### Complex Layer Interaction

```
User: "I control Humility and Opalescence. What happens?"

AI: [Provides detailed layer-by-layer breakdown with CR references]
```

### Commander-Specific Question

```
User: "If my commander dies and I put it in the graveyard, 
       can I still return it to the command zone?"

AI: [Explains state-based actions, replacement effects, and commander zone rules]
```

### Tournament Policy

```
User: "What happens if I accidentally draw an extra card?"

AI: [Explains tournament policy, remedies, and judge procedures]
```

## Response Format

### 1. Summary
- Direct, concise answer
- What happens in the situation
- Clear yes/no when applicable

**Example:**
```
The creature dies. When multiple instances of lethal damage are marked 
on a creature simultaneously, it dies only once.
```

### 2. Interaction
- Conceptual explanation
- How the cards/effects interact
- Why the outcome occurs

**Example:**
```
Lifelink is a static ability that creates a replacement effect. When 
a creature with lifelink deals damage, that damage causes you to gain 
that much life simultaneously.
```

### 3. Step-by-Step
- Ordered sequence of events
- Priority passes
- Trigger handling
- Stack resolution
- State-based actions

**Example:**
```
1. Cast Lightning Bolt targeting opponent
2. Lightning Bolt goes on the stack
3. Priority passes to opponent
4. Opponent casts Counterspell targeting Lightning Bolt
5. Counterspell goes on the stack above Lightning Bolt
6. Both players pass priority
7. Counterspell resolves first, countering Lightning Bolt
8. Lightning Bolt is countered and goes to graveyard
```

### 4. Relevant Rules
- Comprehensive Rules references
- Key rule numbers and descriptions
- Supporting evidence for the ruling

**Example:**
```
- CR 702.15a: Lifelink definition
- CR 120.3b: Damage causes life loss and gain simultaneously
- CR 119.3: Life gain is not a separate event
```

## Supported Question Types

### Card Interactions
```
"Does [Card A] work with [Card B]?"
"What happens when [Card A] and [Card B] are on the battlefield?"
"Can I use [Card A] to counter [Card B]?"
```

### Stack and Priority
```
"Can I respond to [Action]?"
"What's the order of triggers?"
"When do I get priority?"
```

### Replacement Effects
```
"If I have [Card A], does [Card B] trigger?"
"Which replacement effect applies first?"
```

### Commander Rules
```
"Does commander damage count if it's redirected?"
"Can I put my commander in the graveyard to trigger [Card]?"
"How does command tax work with cascade?"
```

### Layer System
```
"What's the P/T of [Creature] with [Effect A] and [Effect B]?"
"How do continuous effects interact?"
```

### Tournament Policy
```
"What happens if I [Illegal Action]?"
"Is [Shortcut] accepted in tournaments?"
```

## Use Cases

### 1. Casual Play Rules Questions
```
User: "Quick rules question for our Commander game..."
AI: [Clear ruling with simple explanation]
```

### 2. Competitive Tournament Prep
```
User: "In a Modern tournament, if..."
AI: [Detailed ruling with tournament policy considerations]
```

### 3. Complex Combo Verification
```
User: "Does this infinite combo work? Step 1:..."
AI: [Step-by-step validation with rule references]
```

### 4. Judge Training
```
User: "Explain how layers work with [Complex Scenario]"
AI: [Comprehensive layer-by-layer breakdown]
```

### 5. Format-Specific Interactions
```
User: "In Commander, how does [Card] interact with..."
AI: [Format-specific ruling with commander rules]
```

### 6. Card Text Clarification
```
User: "What does [Card] do exactly?"
AI: [Oracle text explanation with rule context]
```

## Covered Domains

### Core Rules
- Triggered abilities (enters the battlefield, dies, etc.)
- Activated abilities (tap abilities, mana abilities)
- Static abilities (continuous effects, replacement effects)
- Priority and the stack
- Turn structure (steps and phases)

### Advanced Mechanics
- Layer system (7 layers for continuous effects)
- Replacement effects and prevention effects
- Last Known Information (LKI)
- APNAP (Active Player/Nonactive Player) order
- State-based actions timing

### Game Zones
- Battlefield
- Hand
- Library
- Graveyard
- Exile
- Command zone (Commander format)
- Stack
- Ante (historical)

### Format-Specific
- **Commander**: Command tax, commander damage, color identity
- **Modern**: Format legality, banned cards
- **Pioneer**: Format-specific interactions
- **Legacy/Vintage**: Reserve list, power level interactions
- **Standard**: Current rotation and legality

### Tournament Rules
- Illegal actions and remedies
- Shortcuts and tournament shortcuts
- Slow play and pace of play
- Drawing extra cards
- Mulligan procedures

## Best Practices

### For Accurate Rulings

1. **Be Specific**: Include exact card names
2. **Provide Context**: Mention format, game state, priority
3. **Ask One Question at a Time**: Complex scenarios work better when broken down
4. **Include Card Text**: If asking about older/obscure cards, paste the text
5. **Clarify Timing**: Specify when actions happen (combat, main phase, etc.)

### What to Include

- Exact card names (spelling matters)
- Current game state
- Order of events
- Format being played
- Any replacement effects in play

### When Using Without Internet

- Understand rulings may be based on training data
- Verify critical rulings with official sources
- Check Gatherer/Scryfall for current Oracle text
- Cross-reference with official Comprehensive Rules

## Official Resources

The MTG Judge uses these canonical sources:

- **Comprehensive Rules**: Official rules document (MagicCompRules.txt)
- **Gatherer**: https://gatherer.wizards.com/ - Official Wizards card database
- **Scryfall**: https://scryfall.com/ - Comprehensive search with Oracle text
- **Scryfall API**: https://api.scryfall.com/ - Programmatic card lookup

## Limitations

### What This Prompt Does NOT Do

- **Deckbuilding Advice**: No strategy or metagame suggestions
- **Card Valuation**: No pricing or collection management
- **Lore/Flavor**: Only discusses flavor if rules-relevant
- **Unofficial Rulings**: No fan sites or community speculation
- **Card Design**: No custom card evaluation

### Always Verify

For official tournament play:
- Check current Oracle text on Gatherer/Scryfall
- Consult official Comprehensive Rules
- Ask a certified judge for binding rulings
- Review tournament policy documents

## File Structure

```
MTG Judge/
├── README.md          # This file - usage instructions
└── Prompt.md          # The complete prompt for any LLM
```

## Notes

- **Compatible with**: ChatGPT, Claude, Gemini, Cursor AI, and most LLM platforms
- **Model Recommendation**: Works best with advanced models (GPT-4, Claude 3.5+, Gemini Pro)
- **Internet Access**: Recommended for current Oracle text lookup
- **Language**: Responds in the language of the user's request
- **Format Support**: All official formats (Commander, Modern, Legacy, Vintage, Pioneer, Standard, etc.)

## Troubleshooting

- **If card text is incorrect**: Verify with Scryfall/Gatherer for current Oracle text
- **If ruling seems wrong**: Ask for CR references to verify logic
- **If card not recognized**: Provide exact spelling or card text
- **If interaction unclear**: Break down into smaller questions

## Security & Privacy

- **No Personal Data**: Rules questions don't require personal information
- **Public Cards**: All Magic card data is publicly available
- **Safe Content**: Focus on game rules, no sensitive topics

## Contributing

This prompt can be customized for:
- Specific formats (Commander-only, Modern-only, etc.)
- Tournament level (casual, competitive, professional)
- Language preferences (Spanish MTG terms, etc.)
- House rules documentation

## License

This prompt is provided as-is for use with any LLM platform. Feel free to modify and distribute as needed.

---

**Last Updated**: 2024

**Maintained by**: Community - based on official WotC Comprehensive Rules

**Not Official**: This is a community tool, not an official Wizards of the Coast product. For binding rulings, consult a certified judge.

**Questions or Suggestions?** Adapt the prompt for your playgroup or tournament needs!

