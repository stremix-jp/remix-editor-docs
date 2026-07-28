# Sections

Sections are interval data for audio. Import them from a CSV file and automatically generate waveforms from section attribute values.

## What Are Sections?

Sections are data associated with a specific time range in the audio.

**Example**: A section from 0:30 to 0:45 of the audio with "intensity: 10"

This lets you efficiently build control patterns that match the content of the audio.

## Importing Sections

### CSV File Format

A section CSV requires the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| start_time | Yes | Section start time (seconds) |
| end_time | Yes | Section end time (seconds) |
| (others) | No | Any attribute columns |

**CSV example**:
```csv
start_time,end_time,intensity_params,note
0,10,5,Intro
10,30,10,Chorus
30,45,15,Climax
45,60,5,Outro
```

**Note**: Columns used for waveform generation require the `_params` suffix (details below).

### How to Import

1. Select **File > Import Section Data...**
2. Select the CSV file

You can also import from the toolbar of the Sections panel, or by dragging and dropping the CSV file onto the app.

## Sections Panel

Imported sections are displayed as a table.

### What Happens When You Click a Row

Clicking a row does two things at once.

1. The Curve Editor selection is set to that section's time range
2. The playback position moves to the section's start time

Because choosing a section already determines the target range for waveform generation, there is no need for a separate "set as selection" action.

Use **Shift + click** to select several sections at once. The number of selected sections is shown as a badge in the toolbar.

### Toolbar

| Button | Function |
|--------|----------|
| Import | Load a section CSV |
| Export | Write the current sections out to CSV |
| Clear | Delete all sections |
| ◀ / ▶ | Move to the previous / next section (the playback position moves as well) |
| Auto-scroll | Make the table scroll automatically to follow the playback position |

At the right end, the number of selected sections and the filename of the loaded CSV are shown.

### Editing Cells

1. Click a cell to enter edit mode
2. Enter a value
3. **Escape** cancels; clicking outside the cell saves automatically

The key that confirms the edit depends on the column type.

| Column type | Confirm | Line break |
|-------------|---------|------------|
| Single-line text | Enter | — |
| Multi-line text | Ctrl + Enter or Shift + Enter | Enter |

Cells in `_params` columns have a slider that lets you adjust the intensity intuitively.

## Section Navigation

You can move between sections with the keyboard.

| Key | Action |
|-----|--------|
| ← | Move to the previous section |
| → | Move to the next section |
| Shift + ← | Extend the selection to the previous section |
| Shift + → | Extend the selection to the next section |

**Note**: Keyboard navigation only changes which section is selected; **the playback position does not move**. If you want the playback position to move as well, click a row or use the ◀ ▶ buttons in the toolbar or footer.

## Gap Sections

When there is empty space between sections, a "gap section" is generated automatically.

- Display: grey background, value shown as "-"
- Editing: not allowed
- Navigation: included as a target for movement

**Note**: In waveform generation, a gap section **inherits the value of the preceding section** (for a range value, it inherits the end value). It is displayed as "-", but that does not mean the value is 0.

## Generating Waveforms from Sections

You can automatically generate a waveform from section attribute values.

### Columns That Support Waveform Generation

**Important**: Waveform generation is only available for columns whose names end with `_params`.

**Examples**:
- `intensity_params` ✓ Waveform generation possible
- `speed_params` ✓ Waveform generation possible
- `intensity` ✗ Not possible (treated as a text column)
- `note` ✗ Not possible

When you create your CSV, be sure to add the `_params` suffix to any column you want to use for waveform generation.

### Opening the Generation Dialog

- Click the waveform icon in the column header in the Sections panel

A warning icon is shown in the header of any `_params` column that has no preset set.

### Settings in the Dialog

| Item | Description |
|------|-------------|
| Target Column | Which `_params` column's values to use |
| Target Sections | "All" or "Selected Only" |
| Preset | Save and recall a whole set of settings |
| Text Rules | How to interpret the text attached to a value |
| Waveform Type | Linear / Triangle |
| Advanced Options | Grouping, phase continuity, point optimization |

### Waveform Types

#### Linear

Expresses the section's intensity value directly as a straight line.

- Single value: generates a flat line
- Range value: generates a sloped line

#### Triangle

Generates a triangle wave based on the section's intensity value. You can limit the speed of the wave with "Triangle Slope Settings".

- **Min Slope (unit/sec)**: Never use a slope gentler than this
- **Max Slope (unit/sec)**: Never use a slope steeper than this

Use it when you want to avoid abrupt changes a device cannot follow.

### Text Rules

Configure how the text attached to a `_params` value is interpreted. Add as many rules as you need, each in the form "if this text, then do this".

| Rule | Description |
|------|-------------|
| Value Range | Specify the operating range (min and max) for that text |
| Sign | Specify whether the value is output in the positive or negative direction |
| Waveform On/Off | Generate or ignore the waveform for that text |

### Presets

You can save a whole set of settings, including text rules, as a preset.

- **Save**: Save under a name
- **Delete**: Delete the selected preset
- **Export / Import**: Exchange presets as files

Presets are remembered per column, so you can use different ones for different columns, e.g. preset A for the `intensity_params` column and preset B for the `speed_params` column.

### Advanced Options

| Option | Effect |
|--------|--------|
| Grouping | Treat consecutive sections with the same settings and intensity as one unit |
| Phase Continuity | Continue the wave phase within a group so the waveform does not break at the boundaries |
| Point Optimization | Reduce meaningless intermediate points to keep the output light |

Groups are split by gap sections, and the phase is reset between groups.

## Exporting Sections

You can save the edited section data as CSV.

1. Select **File > Export Section Data...** (also available from the Sections panel toolbar)
2. The file is downloaded

The filename has one of the following formats.

- Normal: `{audio filename}.{timestamp}.sections.csv`
- When opened with work information: `{circle name}-{work number}-{chapter number}.{date}.csv`

## Parameter Format

This section explains the format of values entered in a `_params` column.

### Basic Format

```
{intensity 0-100}{text}
```

**Examples**:
- `30` - intensity 30
- `30全体` - intensity 30, text "全体"
- `70根元` - intensity 70, text "根元"

The intensity is clamped to the range 0-100 and normalized to 0-1 internally. If you write only text, the intensity is treated as 0.

### Changing Values

```
{start value}->{end value}{text}
```

**Examples**:
- `10->30` - intensity changes from 10 to 30
- `0->50全体` - intensity changes from 0 to 50, text "全体"

### What the Text Is For

The text portion is used in combination with "Text Rules".

The built-in presets match Japanese text, so the strings below are entered exactly as shown regardless of the UI language.

**Linear (Penis) preset example**:
| Text | Operating range |
|------|-----------------|
| 全体 (whole) | 0-100% |
| 先端 (tip) | 70-100% |
| 軸部 (shaft) | 30-70% |
| 根元 (base) | 0-30% |

**Rotation preset example**:
| Text | Action |
|------|--------|
| 右回転 (clockwise) | Rotate in the positive direction |
| 左回転 (counter-clockwise) | Rotate in the negative direction |

## Device-Specific Production Tips

### Linear Devices (A10 Piston, The Handy, etc.)

- **Use simple waveforms**: Up-and-down motion such as a triangle wave is the basis
- **Avoid complex shapes**: Complex waveforms make device movement jerky
- **Rest position**: The initial and rest positions are best at the top (value = max value)

### Vibration Devices (Anal plugs, etc.)

- **Rest position**: The initial and rest positions are best at the bottom (value = 0)
- **Triangle / sine waves**: Use them to express piston-like motion

### Rotation Devices (Nipple machines, etc.)

- **Allow negative values**: Enable "Allow Negative Values" to switch the direction of rotation
- **Positive = clockwise, negative = counter-clockwise**
- **Separate left/right control**: For nipple-focused content, setting different waveforms for left and right increases immersion
