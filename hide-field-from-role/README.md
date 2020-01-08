# Hide field from role DatoCMS plugin

If you need to prevent editors or any other role
from seeing a field in the DatoCMS UI,
this is the perfect plugin.

You can install it on any field type and you will just need to specify
which roles you want to hide the field from.

_WARNING_ The SDK's toggleField method will trigger as soon as the
iframe has loaded, so the field will briefly flash before a
"visibility: hidden" is applied.

## Configuration

When applying this plugin to your field,
please insert the roles names or IDs separated by commas.
