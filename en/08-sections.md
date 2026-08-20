# Section Data

Section data is information attached to each interval (start time to end time) of the audio. It can hold arbitrary attributes such as a transcript or notes.

The primary use is **viewing**.

- **Checking the transcript**: Edit while checking, in a table, what is being said where in the audio
- **Notes**: Write down remarks and intent for each interval
- **Navigation**: Click a row to jump straight to that scene

As an advanced use, there is also a feature that [automatically generates waveforms](#generating-waveforms-from-sections) from interval attribute values.

## Importing Sections

### CSV File Format

A section CSV requires the following columns:

| Column | Required | Description |
|--------|----------|-------------|
| start_time | Yes | Section start time (seconds) |
| end_time | Yes | Section end time (seconds) |
| (others) | No | Any attribute columns (transcript, notes, intensity, etc.) |

**CSV example**:
```csv
start_time,end_time,intensity_params,note
0,10,5,Intro
10,30,10,Chorus
30,45,15,Climax
45,60,5,Outro
```

**Note**: Columns used for waveform generation require the `_params` suffix (see [below](#generating-waveforms-from-sections) for details).

### How to Import

1. Select **File > Import Section Data...**
2. Select the CSV file

You can also import from the toolbar of the Sections panel. Dragging and dropping the CSV file onto the app also imports it.

## Sections Panel

![Section Panel](./images/04-section-panel.png)

Imported sections are displayed as a table.

### What Happens When You Click a Row

Clicking a row does two things at once.

1. The Curve Editor selection is set to that section's time range
2. The playback position moves to the section's start time

When you want to fix the curve for a particular scene, a single click on the row both selects the target range and cues it up.

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

If you enable **Auto-scroll** while playing, the row for the scene currently playing is always kept in view. This is convenient for reviewing while following the transcript with your eyes.

### Editing Cells

Cell contents, such as adding to a note, can be edited directly in the table.

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

When sections are loaded, the buttons at both ends of the footer transport also become "move to the previous / next section" buttons.

## Gap Sections

When there is empty space between sections, a "gap section" is generated automatically.

- Display: grey background, value shown as "-"
- Editing: not allowed
- Navigation: included as a target for movement

**Note**: In waveform generation, a gap section **inherits the value of the preceding section** (for a range value, it inherits the end value). It is displayed as "-", but that does not mean the value is 0.

## Exporting Sections

You can save the edited section data as CSV.

1. Select **File > Export Section Data...** (also available from the Sections panel toolbar)
2. The file is downloaded

The filename has one of the following formats.

- Normal: `{audio filename}.{timestamp}.sections.csv`
- When opened with work information: `{circle name}-{work number}-{chapter number}.{date}.csv`

## Generating Waveforms from Sections

From here on, this is an advanced use. You can automatically generate a waveform from section attribute values.

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

### Parameter Format

This section explains the format of values entered in a `_params` column.

#### Basic Format

```
{intensity 0-100}{text}
```

**Examples**:
- `30` - intensity 30
- `30全体` - intensity 30, text "全体"

The intensity is clamped to the range 0-100 and normalized to 0-1 internally. If you write only text, the intensity is treated as 0.

#### Changing Values

```
{start value}->{end value}{text}
```

**Examples**:
- `10->30` - intensity changes from 10 to 30
- `0->50全体` - intensity changes from 0 to 50, text "全体"

#### What the Text Is For

The text portion is used in combination with "Text Rules". For example, by creating a rule for a linear device such as "for this text, limit the operating range to 70-100%", or one for a rotation device such as "for this text, output in the negative direction (reverse rotation)", you can shape different motions just by writing the section table.
