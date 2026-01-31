# Curve Editing

The curve editor is the main editing area of remix-editor. Define value changes along the time axis with points.

## Point Operations

### Add a Point

- **Left-click** on an empty area in the curve editor
- A point is added at the clicked position

### Select a Point

- **Left-click** on a point
- Selected points are highlighted

### Move a Point

1. Select a point
2. **Drag** to move
3. Release mouse to confirm

**Note**: Start point (time=0) and end point (time=maxTime) can only change Y coordinate (value).

### Delete a Point

1. Select a point
2. Press **Delete** or **Backspace**

**Note**: Start and end points cannot be deleted.

### Edit Point Coordinates Numerically

1. Select a point
2. Enter Time and Value in **Property Panel** on the right
3. Press Enter to confirm

## Selection Operations

### Range Selection (Time Range)

1. **Hold Shift and drag**
2. A time range is created
3. All points within the range are selected

### Rectangle Selection

1. **Hold Ctrl and drag**
2. A rectangular range is created
3. All points within the range are selected

### Select All

- **Ctrl + A** selects all points

### Deselect

- **Escape** key to clear selection
- Clicking an empty area also deselects

### Move Selection

1. Make a selection
2. **Drag** within the selection
3. Selected points move together

### Resize Selection

Drag the handles (edges and corners) of the selection to scale points.

| Handle | Action |
|--------|--------|
| Left/Right edges | Scale in time direction |
| Top/Bottom edges | Proportional scale in value direction |
| Corners | Tilted scale (trapezoid transformation) |

**Hold Alt** while dragging to scale symmetrically from center.

### Zoom to Selection

1. Make a selection
2. Press **Z** key
3. Viewport zooms to fit the selection

## Viewport Operations

### Zoom In/Out

- **Scroll mouse wheel**
- Up: Zoom in
- Down: Zoom out

### Pan (Move)

- **Right-click and drag**
- Viewport moves

### Reset Viewport

- Select "Reset View" from context menu
- Returns to show entire view

### Jump to Playback Position

- Press **J** key
- Viewport moves to current playback position

## Clipboard Operations

### Copy

1. Select points or range
2. **Ctrl + C**
3. Selected points are copied to clipboard

### Cut

1. Select points or range
2. **Ctrl + X**
3. Selected points are copied and removed from original position

### Paste

1. **Ctrl + V**
2. Clipboard points are pasted based on **current playback position**

**Note**: If existing points are at paste position, non-endpoint points are overwritten.

## Waveform Generation

Automatically generate waveform patterns in the selected range.

### Open Waveform Generator Panel

1. Make a selection
2. Press **W** key, or select "Waveform Generator" in right panel

### Supported Waveforms

#### Sine Wave

- Smooth periodic changes
- Parameters: Amplitude, Frequency, Phase, Offset, Point Interval

#### Triangle Wave

- Linear rise and fall
- Parameters: Amplitude, Frequency, Phase, Offset, Point Interval, Peak Position

#### Square Wave

- ON/OFF switching
- Parameters: Amplitude, Frequency, Phase, Offset, Point Interval

#### Random Wave

- Random value changes
- Parameters: Amplitude, Frequency, Phase, Offset, Point Interval

### Parameter Description

| Parameter | Description |
|-----------|-------------|
| Amplitude | Wave height (ratio to maxValue) |
| Frequency | Number of waves per second |
| Phase | Wave start position offset |
| Offset | Vertical position of entire wave |
| Point Interval | Interval for placing points (seconds) |
| Peak Position | Triangle wave peak position (0-1) |

### Real-time Frequency Mode

- When enabled, frequency becomes "waves per second" instead of "waves in selection"

## Waveform from Audio

Automatically generate waveforms by analyzing audio volume.

### Volume Analysis

1. Make a selection
2. Press **A** key, or select "Waveform from Audio"
3. Set parameters
4. Click "Generate"

Parameters:
- **Threshold**: Volumes below this are treated as 0
- **Point Interval**: Interval for placing points

### Use Different Audio File

- "Use different file" allows analyzing audio different from current audio
- Example: Analyze sound effects track to generate vibration patterns

## Quantization

Feature to snap points to grid.

### Time Quantization

- Set in pattern settings "Time Step"
- Point time positions are aligned to specified intervals

### Value Quantization

- Set in pattern settings "Value Step"
- Point values are aligned to specified intervals

## Undo/Redo

All editing operations can be undone/redone.

- **Ctrl + Z**: Undo
- **Ctrl + Y** or **Ctrl + Shift + Z**: Redo

## Context Menu

**Right-click** on the curve editor to show context menu.

| Item | Function |
|------|----------|
| Undo | Undo |
| Redo | Redo |
| Copy | Copy selected points |
| Cut | Cut selected points |
| Paste | Paste from clipboard |
| Delete | Delete selected points |
| Select All | Select all points |
| Waveform Generator | Open waveform generator panel |
| Zoom to Selection | Fill screen with selection |
| Reset View | Return to full view |
