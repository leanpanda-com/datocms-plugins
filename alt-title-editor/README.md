# Alt&Title editor DatoCMS plugin

What is this for?
Suppose you are writing an article and you want to add
coherent alts and titles to an article's images.
The only way to do so now is by manually editing all images' metadata.
The Alt&Title editor allows you to bulk-update all of the article's images
by filling in a custom form.
Apply and refresh the page, and all the images will have neat alts and titles.

This plugin can be added to a JSON field
and it will display a simple form with two inputs,
one for the Alt and one for the Title.
By clicking on "apply" it will update all image files in the record.

## Localised projects

Unfortunately, DatoCMS at the moment does not allow localisation
for file metadata
Nevertheless, you can still use this plugin to edit
alts and titles, if you have localised file fields
(meaning you use different files for each locale in a record).

Just enable localisation for the JSON field on which you installed the plugin
to edit images by locale.

## Configuration

You will need to specify a full-access DatoCMS API key
on the plugin global settings so the plugin can edit content.
