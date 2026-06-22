hi! welcome to the website for duke coffeehouse.
built with love.

# how to use?

main thing that requires some nuance is the blogging feature, which is based on Zonelets. here's how you tack a little something to the bulletin board:

1. Make a new .html for your post in `bulletin/`. A good idea is to duplicate template.html.
2. Rename it, changing the date and title without removing any hyphens. YYYY-MM-DD format!
3. Write your heart out.
4. Add the file path to the top of the conspicious `postsArray` in script.js.
  a. `["filepath", "<custom title>", "<tag1>", "<tag2>", ...],` is the format of a line
  b. If custom title is specified here, it will overwrite the `<title>"Blog Post"</title>` in the .html, and appear in 3 places:
    1. The title in the browser
    2. The H1 title on the blog post itself
    3. In lists that list posts (recent posts, all posts, posts with certain tag) `2026-01-01 » ...`
  c. If custom title is instead changed in `<title>"Blog Post"</title>` itself, it will only appear in the first 2 places above.
  d. If custom title is not specified at all, it will be generated from the filename past the third hyphen, i.e. with the date removed.
5. Done!

# credits

email subscription powered by Buttondown

***

blogging functionality from Zonelets
for more information visit https://zonelets.net/

Released under MIT License

Copyright 2020 Marina Kittaka

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

***

tagging system adapted from 3Legged: https://3legged.neocities.org
this modification allows the use of custom tags within the blog, adjusted by 3Legged - you can read more about the changes (and see the tag system in use) here: https://3legged.neocities.org/journal/posts/2023-03-12-Creating-A-Zonelets-Tagging-System

Released under MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.