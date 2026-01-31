# Device Connection

remix-editor can control various devices through Intiface Central.

## Requirements

- [Intiface Central](https://intiface.com/central/) - Device connection middleware
- Compatible devices

## Supported Devices

The following device brands are supported:

| Brand | Support Status |
|-------|----------------|
| The Handy | Full support |
| Lovense | Supported |
| Vorze | Supported |
| ToyCod | Supported |
| Svakom | Supported |
| Others | All Intiface-compatible devices |

## Intiface Central Setup

### Installation

1. Download [Intiface Central](https://intiface.com/central/)
2. Run installer
3. Complete initial setup

### Server Settings

1. Launch Intiface Central
2. Enable WebSocket server in settings
3. Confirm port number (default: 12345)

## Connecting with remix-editor

### Connection Steps

1. Launch Intiface Central and start server
2. Open remix-editor
3. Click "Connect" button in device panel
4. Confirm connection status shows "Connected"

### Auto-Connect

remix-editor automatically attempts to connect to Intiface on startup (after 1 second delay).

## Scanning for Devices

### Scan Steps

1. After connecting, click "Scan" button
2. Intiface Central searches for devices
3. Found devices appear in list

### For Bluetooth Devices

1. Turn on device
2. Put in pairing mode (varies by device)
3. Run scan

## Device List

Connected devices are shown in the list.

### Display Information

- Device name
- Connection status
- Supported actuators

### Expanding Device

Click a device to show details and test control slider.

## Actuator Types

Devices have one or more actuators.

| Type | Description | Control Range |
|------|-------------|---------------|
| Vibrate | Vibration | 0% - 100% |
| Rotate | Rotation (bidirectional) | -100% - +100% |
| Linear | Linear motion | 0% - 100% (position) |
| Constrict | Constriction | 0% - 100% |
| Oscillate | Oscillation (periodic) | 0% - 100% |
| Position | Position control | 0% - 100% |
| Inflate | Inflation | 0% - 100% |

## Pattern-Device Mapping

### Manual Mapping

1. Open pattern settings
2. Expand "Device Mapping" section
3. Select target device and actuator

### Auto-Mapping

Set pattern's "Preferred Device Type" and "Preferred Actuator Type" for automatic mapping when devices connect.

**Preferred Device Type**:
- Penis: Prioritize penis devices
- Anal: Prioritize anal devices
- Nipple: Prioritize nipple devices

**Preferred Actuator Type**:
- Vibrate: Prioritize vibration
- Linear: Prioritize linear motion
- Rotate: Prioritize rotation

### One-to-Many Mapping

One pattern can be sent to multiple devices/actuators simultaneously.

### Conflict Avoidance

Actuators already connected to other patterns are grayed out.

## Test Control

### Direct Control with Slider

1. Expand device in device list
2. Move slider
3. Device responds in real-time

Slider automatically snaps to 0 at 8% or below.

### Stop All

"Stop All" button immediately stops all devices.

## Troubleshooting

### Cannot Connect

1. Confirm Intiface Central is running
2. Confirm server is started
3. Confirm correct port number (default: 12345)
4. Check firewall settings

### Device Not Found

1. Confirm device is powered on
2. Confirm device is within Bluetooth range
3. Confirm device is in pairing mode
4. Confirm device is recognized in Intiface Central

### Device Not Responding

1. Confirm mapping is correctly set
2. Confirm pattern is visible
3. Try direct operation with test slider
4. Check device battery level

### High Latency

Some latency is normal due to Bluetooth connection characteristics.

- Normal: About 50-100ms
- If latency is high: Move device closer to PC

## Notes

- Always charge devices before use
- Limit extended use
- Execute "Stop All" immediately if anything feels wrong
