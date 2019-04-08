# Hide field from role DatoCMS plugin

If you need to prevent editors or any other role
from seeing a field in the DatoCMS UI,
this is the perfect plugin.

You can install it on any field type and you will just need to specify
which roles you want to hide the field from.

*WARNING* The SDK's toggleField method will trigger as soon as the
iframe has loaded, so the field will briefly flash before a
"visibility: hidden" is applied.

## Configuration

Please specify a read-only DatoCMS API key on the plugin global settings.

When applying this plugin to your field,
please insert the roles names separated by commas.
