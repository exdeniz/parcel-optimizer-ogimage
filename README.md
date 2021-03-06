# parcel-optimizer-ogimage

> Set absolute URL for og:image meta tags.


*This plugin is based on [Luke Childs](https://github.com/lukechilds/parcel-plugin-ogimage) and [nothingrandom](https://github.com/nothingrandom/parcel-plugin-ogimage)  and [Eliepse](https://github.com/Eliepse/parcel-plugin-metaimage) code.*

Sets absolute URLs for `og:image` meta tags. This is required by the spec and relative URLs will not work on some sites such as Facebook or Twitter.

This plugin uses the value of the `og:url` meta tag to convert `og:image` to an absolute URL.

*Important:* This plugin request [Parcel v2](https://v2.parceljs.org/)

## Installation
Depending on which package manager you use, either:
* `$ npm install --save-dev parcel-optimizer-ogimage`
* `$ yarn add --dev parcel-optimizer-friendly-ogimage`

Next, add the plugin to the optimizer entry in your `.parcelrc`:

```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.html": ["parcel-optimizer-ogimage", "..."]
  },
  ...
}
```
## Usage

Just install this package as a development dependency. Parcel will automatically call it when building your application.

You **must** have both `og:image` and `og:url` meta tags:

```html
<meta property="og:image" content="card.png">
<meta property="og:url" content="https://example.com">
```

Parcel will generate that into something like this:

```html
<meta property="og:image" content="/card.9190ce93.png">
<meta property="og:url" content="https://example.com">
```

`parcel-optimizer-ogimage` will then update the `og:image` with an absolute URL:

```html
<meta property="og:image" content="https://example.com/card.9190ce93.png">
<meta property="og:url" content="https://example.com">
```


## License

MIT @ Igor Pnev

Thanks [Mark van Seventer](https://github.com/vseventer/parcel-optimizer-friendly-urls) for bootstrap plugin repo.

From [Luke Childs](https://github.com/lukechilds/parcel-plugin-ogimage) and [nothingrandom](https://github.com/nothingrandom/parcel-plugin-ogimage)  and [Eliepse](https://github.com/Eliepse/parcel-plugin-metaimage) code