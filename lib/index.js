"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _plugin = require("@parcel/plugin");

var _posthtml = _interopRequireDefault(require("posthtml"));

var _posthtmlUrls = _interopRequireDefault(require("posthtml-urls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Package modules.

/*
 * Extract a meta from a given html string
 */
const findMeta = (html, propertyName, propertyValue) => {
  const regex = new RegExp(`<meta[^>]*${propertyName}=["|']${propertyValue}["|'][^>]*>`, 'i');
  const regexExec = regex.exec(html);

  if (regexExec) {
    return regexExec[0];
  }

  return false;
};
/*
 * Extract the content of a given meta html
 */


const getMetaTagContent = metaTagHtml => {
  const regex = /content=["]([^"]*)["]/i;
  const regexExec = regex.exec(metaTagHtml);

  if (regexExec) {
    return regexExec[1];
  }

  return false;
};
/*
 * Change the url of a meta by prepending the given baseUrl
 */


const patchMetaToAbsolute = (metaHTML, baseUrl) => {
  const metaContent = getMetaTagContent(metaHTML);
  return metaHTML.replace(metaContent, url.resolve(baseUrl, metaContent) // Relative url to absolute url
  );
}; // Exports.


var _default = new _plugin.Optimizer({
  async optimize({
    bundle,
    contents,
    map,
    options
  }) {
    const ogUrlTag = findMeta(contents, 'property', 'og:url');

    if (options.hot) {
      return {
        contents,
        map
      };
    }

    if (!ogUrlTag) {
      return {
        contents,
        map
      };
    }

    const ogUrl = getMetaTagContent(ogUrlTag); // Fetch original meta

    const opengraphImageMeta = findMeta(contents, 'property', 'og:image');

    if (opengraphImageMeta) {
      contents = contents.replace(opengraphImageMeta, patchMetaToAbsolute(opengraphImageMeta, ogUrl));
    }

    return {
      contents: (await (0, _posthtml.default)([plugin]).process(contents)).html
    };
  }

});

exports.default = _default;