# Sections

Sections are interval data for audio. Import from CSV files and automatically generate waveforms from section attribute values.

## What are Sections?

Sections are data associated with specific time ranges in audio.

**Example**: A section from 0:30 to 0:45 with "Intensity: 10"

This allows efficient creation of control patterns matched to audio content.

## Importing Sections

### CSV File Format

Section CSV requires the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| start_time | Yes | Section start time (seconds) |
| end_time | Yes | Section end time (seconds) |
| (others) | No | Any attribute columns |

**CSV Example**:
```csv
start_time,end_time,intensity_params,note
0,10,5,Intro
10,30,10,Chorus
30,45,15,Climax
45,60,5,Outro
```

**Note**: Columns used for waveform generation require the `_params` suffix (see details below).

### Import Method

1. Select **File > Import Section CSV**
2. Select CSV file
3. Confirm preview
4. Click "Import"

Drag and drop is also supported.

## Section Panel

Imported sections are displayed in the section panel.

### Display Modes

- **Current Section Only**: Show details of section at playback position
- **All Sections**: Show list of all sections

### Editing Sections

1. Click a cell to enter edit mode
2. Enter value
3. **Enter** to confirm, **Escape** to cancel

For multi-line text, use **Ctrl + Enter** for line breaks.

## Section Navigation

Navigate between sections with keyboard.

| Key | Action |
|-----|--------|
| Left Arrow | Move to previous section |
| Right Arrow | Move to next section |
| Shift + Left Arrow | Extend selection forward |
| Shift + Right Arrow | Extend selection backward |

When moving to a section, playback position also moves to that section's start.

## Set Section as Selection

1. Select a section in the section panel
2. Click "Set as Selection" button
3. Curve editor selection is set to section's time range

This makes waveform generation per section easy.

## Gap Sections

When there are gaps between sections, "gap sections" are automatically generated.

- Display: Gray background, value is "-"
- Editing: Not allowed
- Purpose: Visualize gaps between sections

## Waveform Generation from Sections

Automatically generate waveforms from section attribute values.

### Columns Available for Waveform Generation

**Important**: Waveform generation is only available for columns whose names end with `_params`.

**Examples**:
- `intensity_params` ✓ Can generate waveforms
- `speed_params` ✓ Can generate waveforms
- `intensity` ✗ Cannot generate waveforms (treated as text column)
- `note` ✗ Cannot generate waveforms

When creating your CSV, make sure to add the `_params` suffix to columns you want to use for waveform generation.

```csv
start_time,end_time,intensity_params,note
0,10,5,Intro
10,30,10,Chorus
30,45,15,Climax
45,60,5,Outro
```

### Open Generation Dialog

1. Click "Generate" button on column header in section panel
2. Or select section, right-click > "Waveform Generation"

### Generation Modes

#### Triangle Wave Generation

Generate triangle waves based on section intensity values.

- Single value (e.g., `10`): Generate triangle wave at that intensity
- Range value (e.g., `10->30`): Generate triangle wave changing from start to end value

#### Line Wave Generation

Generate lines based on section intensity values.

- Single value: Generate flat line
- Range value: Generate sloped line

### Text Rules

Configure rules for interpreting attribute value text.

| Rule | Description | Example |
|------|-------------|---------|
| valueRange | Range specification format | `10->30` |
| waveformToggle | Waveform type switching | `triangle`, `line` |
| signDirection | Positive/negative direction | `+`, `-` |

### Slope Control

Limit the slope of generated waveforms.

- **minSlope**: Minimum slope (slopes below this not allowed)
- **maxSlope**: Maximum slope (slopes above this not allowed)

Use when you want to avoid sudden changes.

### Presets

Save waveform generation settings as presets.

1. Adjust settings
2. Click "Save Preset"
3. Enter preset name

Saved presets can be selected later.

### Column Presets

Store presets individually for each column.

- Preset A for "intensity" column
- Preset B for "speed" column

Such differentiation is possible.

## Section Grouping

When consecutive sections have the same settings and intensity, they are automatically grouped.

- Triangle wave phase continues within group
- Empty sections split groups
- Phase resets between groups

This maintains natural waveform continuity.

## Exporting Sections

Save edited section data as CSV.

1. Select **File > Export Section CSV**
2. Specify filename and save

Filename format: `{audio filename}.{timestamp}.sections.csv`
