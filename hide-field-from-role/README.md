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

In the global variables settings insert a full access API token (required)
and an optional list of default roles that won't see any field with 
the plugin installed - names or IDs separated by commas.

When applying this plugin to your field,
please insert the roles names or IDs separated by commas. 

The hide field rule for the field will be applied to 
the default roles - if any - and the field specific roles.
