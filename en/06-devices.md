# Device Connection

remix-editor can control various devices through Intiface Central.

## Requirements

- [Intiface Central](https://intiface.com/central/) - Device connection middleware
- Compatible devices

## Supported Devices

Any device supported by Intiface Central (Buttplug.io) can be used.

| Brand | Support Status |
|-------|----------------|
| The Handy | Full support |
| Lovense | Supported |
| Vorze | Supported |
| Svakom | Supported |
| ToyCod | Supported |
| BeYourLover / Fantasy Cup | Supported |
| Others | All Intiface-compatible devices |

For the brands above, the **device type (body part) is also inferred automatically** from the device name.

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

1. Launch Intiface Central and start the server
2. Open remix-editor
3. Select **Device > Connect...** from the menu, or click the "Connect" button in the Devices panel
4. On success, the button changes to "Disconnect" and the device list appears

To disconnect, use **Device > Disconnect** or the "Disconnect" button in the Devices panel. While disconnected, the Devices panel shows the configured Intiface server URL as a hint.

### Auto-Connect

remix-editor automatically attempts to connect to Intiface on startup (after about 1 second delay).

To turn this off, disable **Settings > Device > Auto Connect**.

### Changing the Server URL

Change it in **Settings > Device > Intiface Server URL** (default: `ws://localhost:12345`).

## Device Discovery

Device scanning is performed **in Intiface Central**. remix-editor has no scan button.

1. Turn on the device
2. Put it in pairing mode (varies by device)
3. Run a scan in Intiface Central

While connected, remix-editor polls the Intiface Central device list, so devices that are added or removed are reflected in the Devices panel automatically.

## Device List

Connected devices are shown in the list in the Devices panel.

### Display Information

- Device name
- Device type badge (inferred from the device name; shows `?` when it cannot be inferred)
- Battery level (supported devices only)

The device type badge shows one of Penis Device / Anal Device / Nipple Device / Vaginal Device / Clitoral Device.

### Distinguishing Devices with the Same Name

When multiple devices share the same name, a circled serial number is appended, such as `Lovense Edge ①` `Lovense Edge ②`. A device connected on its own gets no number.

### Expanding a Device

Click the device name to expand it and show the test control sliders.

## Actuator Types

A device has one or more actuators.

### Standard Actuators

| Type | Display Name | Description |
|------|--------------|-------------|
| Vibrate | Vibrate | Vibration strength |
| Rotate | Rotate | Rotation (negative values reverse the direction) |
| Linear | Linear | Position (moves to the specified position) |

### Experimental Mode

Enabling **Settings > General > Experimental Mode** adds the following types to a pattern's "Preferred Actuator".

| Type | Display Name |
|------|--------------|
| Oscillate | Oscillate |
| Constrict | Constrict |
| Inflate | Inflate |
| Position | Position |
| Spray | Spray |
| Temperature | Temperature |
| Led | LED |

Depending on what the device itself supports, these may not behave as expected.

## Pattern-Device Mapping

Device mapping is configured in the **Patterns panel**. Expand a pattern and open the "Device Mapping" section.

### Mapping Steps

1. Expand a pattern in the Patterns panel
2. Open the "Device Mapping" section
3. Check the checkbox of an actuator listed under each device (shown as `Vibrate 1`, `Linear 1`, etc.)

If no device is connected, "No devices connected" is shown.

### Preferred Device / Preferred Actuator

Pattern settings include "Preferred Device" and "Preferred Actuator", which indicate the body part and the kind of motion the pattern is intended for. They are saved in the Remix file and used to assign devices on the playback side.

**Preferred Device**: None / Penis Device / Anal Device / Nipple Device / Vaginal Device / Clitoral Device

**Preferred Actuator**: None / Vibrate / Rotate / Linear (experimental mode also offers the additional types listed above)

> **Preferred Actuator must be set** in order to export or save a Remix. Export is blocked while any pattern has it unset.

### One-to-Many Mapping

One pattern can be sent to multiple devices/actuators simultaneously.

### Conflict Avoidance

Actuators already connected to another pattern are grayed out and show "Connected to {pattern name}".

## Test Control

Expanding a device shows "Test Control", which drives each actuator directly, independently of patterns.

### Direct Control with Slider

1. Expand a device in the device list
2. Move the slider for an actuator (0% - 100%)
3. The device responds in real time

- The slider **snaps to 0 automatically at 8% or below**.
- **Linear is only sent when you release the drag** (move duration 500ms). Vibrate, Rotate and others are sent immediately while dragging.

### Stop All

The "Stop All" button at the bottom of each device's test control immediately stops **all connected devices**.

## Troubleshooting

### Cannot Connect

1. Confirm Intiface Central is running
2. Confirm the server is started
3. Confirm the Intiface server URL in **Settings > Device** is correct (default: `ws://localhost:12345`)
4. Check firewall settings

### Device Not Found

1. Confirm the device is powered on
2. Confirm the device is within Bluetooth range
3. Confirm the device is in pairing mode
4. Confirm the device is recognized in Intiface Central (scanning is done in Intiface Central)

### Device Not Responding

1. Confirm the mapping is correctly set
2. Confirm the pattern's **output is enabled** (power icon; the eye icon only toggles display and does not stop output)
3. Try direct operation with the test control slider
4. Check the device battery level

### High Latency

Some latency is normal due to Bluetooth connection characteristics.

- Normal: about 50-100ms
- If latency is high: move the device closer to the PC
- **Settings > Playback > Playhead Offset** (default 0.2 sec) compensates for the send timing

## Notes

- Always charge devices before use
- Limit extended use
- Execute "Stop All" immediately if anything feels wrong
