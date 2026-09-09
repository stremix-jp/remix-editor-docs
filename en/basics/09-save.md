# 9. Saving

"Saving" in remix-editor has two separate paths. How you opened the editor (lesson 1) decides which one you use.

| How you opened it | How to save |
|-------------------|-------------|
| From the CMS | The on-screen **"Save" button** saves directly to the server |
| By opening the URL directly | **File > Save Remix...** downloads a file |

## Autosave is not "saving"

Your edits are recorded inside the browser automatically all the time, so you can reopen the page and continue. But this is **a temporary record inside that one browser only**. Clearing browser data or opening on another PC loses it. To keep your work for sure, always save with one of the methods below.

## Saving directly to the CMS

When opened from the CMS, a draggable **"Save" button** floats on screen.

1. Press "Save"
2. When the label goes "Saving..." then "Saved", it is on the server
3. If it shows "Error", read the message and save again

No file download happens; the data on the CMS side is updated. Make it a habit to press it at every good stopping point.

## Saving as a file

1. Choose **File > Save Remix...** (**Ctrl + Shift + S**) from the menu
2. A `.remix.json` file is saved as a browser download

The file contains every pattern's settings and points, plus pivots. To load it, use **File > Open Remix...**.

::: warning When saving fails
If any pattern has no preferred actuator, the message "Some patterns have no preferred actuator type" appears and nothing is saved. Go back to lesson 4 and set it.
:::

## Keeping section notes

If you wrote notes in sections in lesson 5, saving directly to the CMS saves the notes too. To keep them as a file, download a CSV with **File > Export Section Data...**.

## What to do in this lesson

Save your work so far. If you opened from the CMS, confirm the "Saved" label; otherwise confirm the downloaded `.remix.json`.

## Next

[10. Basics by Device Type](./10-by-device.md)
