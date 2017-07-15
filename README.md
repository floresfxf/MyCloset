# MyCloset
My closet is an interactive application written for iOS which helps users find top-rated matching outfits for articles of clothing they may have in their closet. Users will have a profile with an individual closet and sketchbook. To use the closet, users will either input the item UPC (Found on the clothing tag) or manually enter the information to the database. When items are added to the closet, users will able to find top-rated outfits WITH these specific articles of clothing in their closet!

  
Users will also have a sketchbook, where they will make outfits and submit them to the server, which will be displayed on the apps newfeed. The newsfeed is divided into 'All' and 'recommended', where recommended designs are designs that contain at least one article of clothing from your closet. Users will be able to upvote and downvote designs that they find on their newsfeed. Both newsfeeds will be ordered by rating.

## Getting Started
To run this code, you must have [Expo.io](https://expo.io/) installed.
After this is done run these commands in your terminal:
```
git clone https://github.com/floresfxf/MyCloset
cd /MyCloset
npm install
```
After this, simply open the project in expo, wait for everything to load, and you'll be all set!

## Using the API
The backend server api is located here:
https://fringuante-moliere-12742.herokuapp.com

These are the routes you will use to communicate with the database:
  
**METHOD:POST**  
`/users/register`  
Register a new user  
Body:  
 * username
 * password 
  
**METHOD:POST**  
`/users/login`    
Check a users credentials  
  
**METHOD:GET**  
`/all/items/:username`   
Generate all items in a specified users closet  
  
**METHOD:GET**  
`/all/:username`  
Generate the entire user model object  
  
**METHOD:GET**  
`/all/designs`  
Generate all existing designs (NEWSFEED) 
  
**METHOD:GET**  
`/all/designs/:username`  
Generate all designs for one specific user  
  
**METHOD:POST**  
`/new/items/:username`   
Add an article of clothing to a specific users closet  
  
**METHOD:POST**  
`/new/designs/:username`  
Add a new design to a specific users sketchbook  
  
**METHOD:POST**  
`/designs/voteup/:designId`   
Up vote a design  
  
**METHOD:POST**  
`/designs/votedown/:designId`  
Down vote a design  
  

## Design Overview
### Clients Profile
#### My Closet 
This is where users scanned/submitted articles of clothing will be saved.
To import clothing, Client will be able to scan the UPC code of the product on the tag when bought, or Client will be able to manually input an article of clothing by inputting crucial information (Article brand, color, type, etc).
Submitting all clothing in a closet at once seems daunting, so the application will be designed work more on a input-as-you-need basis.
#### My Sketchbook
Clients will be able to view all of thier designs that they have created and submitted to the application. Designs will not be limited to the Clients closet.
Clients will be able to make and submit new designs here as well. This will submit the design to thier sketchbook and newsfeed.
### Designs Newsfeed
Clients will be able to browse other designs.
Designs tab will has 3 sub-tabs: All/Public, Recommended, and Friends.
All lists will be initially organized by ONLY rating (highest to lowest).
#### All/Public
This tab is for all designs in the database. Will load 20 designs at a time, 20 more when reached bottom of scrollbar, and so on.
#### Recommended
This tab will display the top rated designs which incorperate any item of clothing the user may have in thier closet. If designs do not exist, it will sort by other sub categories (type, color, etc).
#### Friends
This tab will simply display designs submitted by friends. Friends wil be imported using the Facebook API, and will also give a newfeed type style. Also is initially sorted by highest-ranked.
#### Side-Menu
The side-menu will be used for the content filter. 
##### Contains (Drop menu)
Will return any designs that contain the selected article of clothing from your closet.
##### Rating (Star selector)
Will return any designs that have the selected amount of stars, (and above?)(like if you select 3 stars, should it display everyhting in the range of 3-5 stars?)
##### Item Matches (Radio button)
Has two options of "Match exact" and "Match similar", which will work in conjunction with Contains, to display designs with the exact article of clothing, or designs matching the type and color exxactly, but not brand.
##### Design Style (Check Boxes)
Client will select which design styles they wish to display. Design styles are 'tags' or 'topics' linked to design. These topics are all not dynamic so users must select at least two per design.

