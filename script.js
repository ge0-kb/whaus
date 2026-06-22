/*Welcome to the script file! Your 1st time here, you should update
  the BASIC INFO section to include your name and website/social 
  media link (if desired). Most of the time, you will just come
  here to update the POSTS ARRAY. However, you can also edit or
  add your own scripts to do whatever you like!*/

//TABLE OF CONTENTS
  // 1. Basic Info
  // 2. Posts Array
  // 3. Creating HTML Sections to Be Inserted (Header, Footer, etc)
  // 4. Inserting the Sections Into our Actual HTML Pages

//-----------------------------

//==[ 1. BASIC INFO ]==

let blogName = "chaus";
let authorName = "the nightjar";
let authorLink = ""; // Enter your website, social media, etc. Some way for people to tell you they like your blog! (Leaving it empty is okay too)

//-----------------------------

//==[ 2. POSTS ARRAY ]==

/*Each time you make a new post, add the filepath here at the top of postsArray.
  This will cause all the right links to appear and work.
  NOTE: It's important to follow this exact naming convention, because the scripts
  below are expecting it ( 'posts/YYYY-MM-DD-Title-of-Your-Post.html', ). You can
  alter the scripts if you want to use a different naming convention*/
/*UPDATE: as of version 1.3, you may omit the date if you would like. But if you
  use a date it must still follow that format.*/

let postsArray = [
//[ "posts/2020-11-10-Special-Characters-Example.html", encodeURI( 'Spéci@l "Character\'s" Examp|e' ) ],
//[ "posts/2020-11-10-My-Third-Post-Example.html" ],
//["posts/2020-11-10-HTML-cheat-sheet.html", "", "album review"],
//["posts/2025-12-30-Amazing-Wonderful.html", encodeURI( 'Spéci@l "Character\'s" Examp|e' ), "life", "bugs", "other tags that exist"],
    ["bulletin/2026-06-22-bugs4life.html", "", "bugs"],
    ["bulletin/2026-02-04-wednesday-summer.html", ""]
  ];

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//==[ 3. GENERATING THE HTML SECTIONS TO BE INSERTED ]==

let url = window.location.pathname;

//The date format to look for is 4 digits, hyphen, 2 digits, hyphen, 2 digits, hyphen.
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;

// regex helpers replace hard-coded slice positions (hard-code issue encountered 260622 when changing pages/ to bulletin/)
function getFilename(path) {
  return path.split("/").pop();
}

function getDateString(path) {
  const match = getFilename(path).match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : "";
}

function getTitleString(path) {
  const filename = getFilename(path).replace(".html", "");

  // remove leading YYYY-MM-DD- if present
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/-/g, " ");
}

//Check if you are in posts (if so, the relative links will have to go up a directory)
let relativePath = ".";
if ( url.includes("bulletin/") || url.includes("tags/") ) {
  relativePath = "..";
}

//Generate the Header HTML, a series of list items containing links.
let headerHTML = '<ul> <li><a href="' + relativePath + '/index.html">home</a></li>' +
'<li> ¤ </li>' +
'<li><a href="' + relativePath + '/about.html">about</a></li>' +
'<li> ¤ </li>' +
'<li><a href="' + relativePath + '/bulletin.html">bulletin</a></li>' +
'<li> ¤ </li>' +
'<li><a href="' + relativePath + '/calendar.html">calendar</a></li> </ul>';

//Generate the Footer HTML, which uses the variables defined in the BASIC INFO section above to list info about the site.
//Note: feel free to remove the references to Zonelets and Neocities! Just be careful not to delete any necessary HTML closing tags or other syntax.
//let footerHTML = "<hr><p>" + blogName + " is written by <a href='" + authorLink + "'>" + authorName + "</a>, built with <a href='https://zonelets.net/'>zonelets</a>, and hosted by <a href='https://neocities.org/'>neocities</a></p>";
let footerHTML = "<hr><p>" + blogName + " is written by <i>" + authorName + "</i></p>";

//To do the following stuff, we want to know where we are in the posts array (if we're currently on a post page).
let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf('bulletin/'));
//Depending on the web server settings (Or something?), the browser url may or may not have ".html" at the end. If not, we must add it back in to match the posts array. (12-19-2022 fix)
if ( ! currentFilename.endsWith(".html") ) {
    currentFilename += ".html";
}
let i;
for (i = 0; i < postsArray.length; i++) {
  if ( postsArray[i][0] === currentFilename ) {
    currentIndex = i;
  }
}

//Convert the post url to readable post name. E.g. changes "2020-10-10-My-First-Post.html" to "My First Post"
//Or pass along the "special characters" version of the title if one exists
function formatPostTitle(i) {
  // check if there is an alternate pass-thru post title specified (in index 1 of each post)
  if (postsArray[i][1] != "") {
    //Remember how we had to use encodeURI for special characters up above? Now we use decodeURI to get them back.
    return decodeURI(postsArray[i][1]);
  } else {
    //If there is no alternate post title, check if the post uses the date format or not, and return the proper title
    // uses regex helper now instead of slice() yay
    return getTitleString(postsArray[i][0]);
  }
}

//Get the current post title and date (if we are on a post page)
let currentPostTitle = "";
let niceDate = "";
let postTagsHTML = "tags: ";
if ( currentIndex > -1 ) {
  currentPostTitle = formatPostTitle( currentIndex );
  //Generate the "nice to read" version of date to display at top of blog post using regex helper
  const dateString = getDateString(postsArray[currentIndex][0]);
  if (dateString) {
    const [year, monthSlice, day] = dateString.split("-");

    let month = "";
    if (monthSlice === "01") { month = "jan"; }
    else if (monthSlice === "02") { month = "feb"; }
    else if (monthSlice === "03") { month = "mar"; }
    else if (monthSlice === "04") { month = "apr"; }
    else if (monthSlice === "05") { month = "may"; }
    else if (monthSlice === "06") { month = "jun"; }
    else if (monthSlice === "07") { month = "jul"; }
    else if (monthSlice === "08") { month = "aug"; }
    else if (monthSlice === "09") { month = "sep"; }
    else if (monthSlice === "10") { month = "oct"; }
    else if (monthSlice === "11") { month = "nov"; }
    else if (monthSlice === "12") { month = "dec"; }

    niceDate = day + " " + month + " " + year; //this used to need slice()
  }
  //tag creation FOR PER PAGE TAG LIST
  //console.log("about to create tag list");
  for (i = 2; i < postsArray[currentIndex].length; i++) {
    console.log(postsArray[currentIndex][i]);
    postTagsHTML += '<a href="/tags/' + postsArray[currentIndex][i].replaceAll(' ', '') + '.html">' + postsArray[currentIndex][i] + '</a>, ';
  }
  postTagsHTML = postTagsHTML.slice(0, -2);
  postTagsHTML += '<hl></hl>';
}

//Generate the Post List HTML, which will be shown on the "bulletin" page.
function formatPostLink(i,arrayToFormat) {
  let postTitle_i = "";

  if (arrayToFormat[i][1] != "") {
    postTitle_i = decodeURI(arrayToFormat[i][1]);
  } else {
    postTitle_i = getTitleString(arrayToFormat[i][0]);
  }

  const dateString = getDateString(arrayToFormat[i][0]);

  if (dateString) {
    return '<li><a href="' + relativePath + '/' +
      arrayToFormat[i][0] + '">' +
      dateString + " \u00BB " + postTitle_i +
      '</a></li>';
  } else {
    return '<li><a href="../' + relativePath + '/' +
      arrayToFormat[i][0] + '">' +
      postTitle_i +
      '</a></li>';
  }
}

let postListHTML = "<ul>";
for ( let i = 0; i < postsArray.length; i++ ) {
  postListHTML += formatPostLink(i,postsArray);
}
postListHTML += "</ul>";

//Generate the Recent Post List HTML, which can be shown on the home page (or wherever you want!)
let recentPostsCutoff = 3; //Hey YOU! Change this number to set how many recent posts to show before cutting it off with a "more posts" link.
let recentPostListHTML = "<ul>";
let numberOfRecentPosts = Math.min( recentPostsCutoff, postsArray.length );
for ( let i = 0; i < numberOfRecentPosts; i++ ) {
  //recentPostListHTML += formatPostLink(i);
  recentPostListHTML += formatPostLink(i,postsArray);
}
/*If you've written more posts than can fit in the Recent Posts List,
  then we'll add a link to the archive so readers can find the rest of
  your wonderful posts and be filled with knowledge.*/
if ( postsArray.length > recentPostsCutoff ) {
  recentPostListHTML += '<li class="moreposts"><a href=' + relativePath + '/archive.html>\u00BB more bulletins</a></li></ul>';
} else {
  recentPostListHTML += "</ul>";
}

//Generate the Next and Previous Post Links HTML
let nextprevHTML = "";
let nextlink = "";
let prevlink = "";

/*If you're on the newest blog post, there's no point to a "Next Post" link, right? And vice versa with the oldest post! That's what the following code handles.*/
if ( postsArray.length < 2 ) {
  nextprevHTML = '<a href="' + relativePath + '/index.html">home</a>';
} else if ( currentIndex === 0 ) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/index.html">home</a> | <a href="'+ relativePath + '/' + prevlink +'">previous \u00BB</a>';
} else if ( currentIndex === postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML = '<a href="' + relativePath + '/' + nextlink +'">\u00AB next</a> | <a href="' + relativePath + '/index.html">home</a>';
} else if ( 0 < currentIndex && currentIndex < postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/'+ nextlink +'">\u00AB next</a> | <a href="' + relativePath + '/index.html">home</a> | <a href="' + relativePath + '/'+ prevlink +'">previous \u00BB</a>';
}

//-----------------------------

//new function to generate a list of posts with a specific tag
let taggedPostArray = [];
let tag = "";
function getTaggedPosts (pageTitle) {
  tag = pageTitle.toLowerCase();
	for (i=0; i < postsArray.length; i++) {
		for (x=2; x < postsArray[i].length; x++) {
			if (postsArray[i][x] == tag) {
				taggedPostArray.push(postsArray[i]);
			}
		}
	}
	let taggedPostListHTML = '<h1> bulletins tagged: ';
  taggedPostListHTML += pageTitle.toLowerCase();
  taggedPostListHTML += '</h1> <ul>';
	for ( let i = 0; i < taggedPostArray.length; i++ ) {
  		taggedPostListHTML += '<li>' + formatPostLink(i,taggedPostArray) + '</li>';
	}
	taggedPostListHTML += '</ul>';
	return taggedPostListHTML;
}

/*
//new function to get list of all used tags
function getTagList () {
	let tagArray = [];
	for (i=0; i < postsArray.length; i++) {
		for (x=2; x < postsArray[i].length; x++) {
      let currentString = postsArray[i][x];
      console.log(currentString);
		  if (tagArray.length == 0) {
	    tagArray.push([currentString, 1]);
      console.log("first");
	    }
			else if (tagArray.includes([currentString, true]) == false) {
				tagArray.push([currentString, 1]);
        console.log("if");
			} else {
        tagArray[tagArray.findIndex([currentString, true])][1] += 1;
        console.log("elif");
      }
		}
	}
  console.log(tagArray);
	return tagArray;
}
*/

//function to get list of all used tags AND count how many posts per tag
function getTagListCount() {
  let tagArray = [];
  let countArray = [];
  for (i=0; i < postsArray.length; i++) {
		for (x=2; x < postsArray[i].length; x++) {
      let currentString = postsArray[i][x];
      //console.log(currentString);
		  if (tagArray.length == 0) {
	      tagArray.push(currentString);
        countArray.push(1);
        //console.log("first");
	    }
			else if (tagArray.includes(currentString) == false) {
				tagArray.push(currentString);
        countArray.push(1);
        //console.log("elif");
			} else {
          countArray[tagArray.indexOf(currentString)] += 1;
      }
		}
	}
  //console.log(tagArray);
  //console.log(countArray);
	return [tagArray, countArray];
}


//new function to turn tag array into list of links
//FOR MAIN PAGE LISTING ALL EXTANT TAGS
function formatTagList (tagcountArrays) {
	let tagListHTML = '<ul>';
	for (i = 0; i < tagcountArrays[0].length; i++) {
  		tagListHTML += '<li><a href="/tags/' + tagcountArrays[0][i].replaceAll(' ', '') + '.html">' + tagcountArrays[0][i] + '</a> (' + tagcountArrays[1][i] + ')</li>';
	}
	tagListHTML += "</ul>";
	return tagListHTML;
}

//==[ 4. INSERTING THE SECTIONS INTO OUR ACTUAL HTML PAGES ]==

/*Here we check if each relevant div exists. If so, we inject the correct HTML!
  NOTE: All of these sections are optional to use on any given page. For example, if there's 
  one particular blog post where we don't want the footer to appear, 
  we simply don't put a <div id="footer"> on that page.*/

if (document.getElementById("nextprev")) {
  document.getElementById("nextprev").innerHTML = nextprevHTML;
}
if (document.getElementById("postlistdiv")) {
  document.getElementById("postlistdiv").innerHTML = postListHTML;
}
if (document.getElementById("recentpostlistdiv")) {
  document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
}
if (document.getElementById("header")) {
  document.getElementById("header").innerHTML = headerHTML;
}
if (document.getElementById("blogTitleH1")) {
  document.getElementById("blogTitleH1").innerHTML = blogTitle;
}
if (document.getElementById("postTitleH1")) {
  document.getElementById("postTitleH1").innerHTML = currentPostTitle;
}
if (document.getElementById("postDate")) {
  document.getElementById("postDate").innerHTML = niceDate;
}
if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}

//the below three items are additional for the tagging system:
//generates a list of all posts tagged with the page title - ideal for use on individual tag pages like https://3legged.neocities.org/journal/tags/coding
//HTML to put on your page: <div id="taggedPosts"></div>
if (document.getElementById("taggedPosts")) {
  document.getElementById("taggedPosts").innerHTML = getTaggedPosts(document.title);
}
//generates a linked list of all tags used across your blogposts, useful for sidebars or archive pages.
//YOU WILL NEED TO manually create a page for each tag in order for these links to work!
//HTML to put on your page: <div id="tagList"></div>
if (document.getElementById("tagList")) {
  document.getElementById("tagList").innerHTML = formatTagList(getTagListCount());
}
//generates a list of all tags attached to a particular post - this only works on post pages, but works great at the top or bottom of a post.
//HTML to put on your page: <div id="postTags"></div>
if (document.getElementById("postTags")) {
  document.getElementById("postTags").innerHTML = postTagsHTML;
}

//Dynamically set the HTML <title> tag from the postTitle variable we created earlier
//The <title> tag content is what shows up on browser tabs
if (document.title === "Blog Post") {
  document.title = currentPostTitle;
}