# Pattern Management

Control patterns define the value changes to be sent to devices. You can create multiple patterns and assign them to different devices.

## Basic Pattern Operations

### Add a Pattern

1. Click the "+" button in the pattern list
2. A new pattern will be created and automatically selected

### Select a Pattern

- Click a pattern to make it the editing target
- The selected pattern is highlighted

### Rename a Pattern

1. Double-click the pattern name
2. Enter the new name
3. Press Enter to confirm, Escape to cancel

### Change Pattern Color

1. Click the pattern's color icon
2. Select a color from the color picker
3. The color is reflected in the curve editor display

### Delete a Pattern

1. Click the pattern's trash icon
2. Select "Delete" in the confirmation dialog

**Note**: Deletion cannot be undone.

## Pattern Display Control

### Toggle Show/Hide

- Click the eye icon to toggle show/hide
- Hidden patterns are not displayed in the curve editor
- Hidden patterns cannot be edited (a warning is displayed)

### Display Multiple Patterns

- When multiple patterns are visible, they are overlaid in the curve editor
- Each pattern is distinguished by its set color
- Only the selected pattern can be edited

## Pattern Settings

Detailed settings are available for each pattern.

### Open Settings

- Click the pattern's settings icon (gear)

### Maximum Value (maxValue)

- Sets the upper limit of pattern values
- Default: 20
- Values sent to devices are normalized to 0% - 100%

**Example**: With maxValue of 20
- Value 10 → Sent to device as 50%
- Value 20 → Sent to device as 100%

### Value Step (valueStep)

- Sets the quantization (snap) interval for values
- When set, point values automatically snap to steps

**Example**: With valueStep of 5
- Values snap to 0, 5, 10, 15, 20...

### Allow Negative Values

- When enabled, values below 0 can be entered
- Negative values are used for rotation direction control, etc.

### Preferred Device Type

Sets priority for automatic pattern-to-device connection.

Options:
- **Penis**: Prioritize penis devices
- **Anal**: Prioritize anal devices
- **Nipple**: Prioritize nipple devices
- **None**: No automatic connection

### Preferred Actuator Type

Sets the type of actuator to prioritize when connecting patterns.

Options:
- **Vibrate**: Vibration
- **Linear**: Linear motion
- **Rotate**: Rotation

### Clear Waveform

- Deletes all points in the pattern
- Start point (time=0) and end point (time=maxTime) are automatically recreated

## Current Value Display

- During playback, the current value at the playback position is displayed in the pattern list
- You can see how much intensity is being sent to devices

## Best Practices

### Pattern Naming

Clear names make management easier.

**Good examples**:
- "Main Vibration"
- "Linear Motion"
- "BGM Sync"

### Color Coding

- Using different colors for different roles makes it easier to distinguish patterns
- Example: Blue for vibration, red for linear

### Number of Patterns

- The number of patterns needed depends on your device configuration
- One pattern per device is basic, but the same pattern can be sent to multiple devices
