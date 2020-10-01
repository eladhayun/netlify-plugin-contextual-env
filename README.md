# netlify-plugin-contextual-site-env

This plugin swaps out ENV vars on Netlify at build time. Here's how it works:

Say you have an ENV in your API code called `DATABASE_URL`. If you use this plugin, you'll be able to override that value based on a Site Name.

For example:

- A `site_a` site name, would automatically set `DATABASE_URL` to the value of `SITE_A_DATABASE_URL` if it exists.

# Usage

## Add the plugin

Add a `[[plugins]]` entry to your `netlify.toml` file:

```toml
[[plugins]]
package = 'netlify-plugin-contextual-site-env'
```