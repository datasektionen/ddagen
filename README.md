# D-Dagen
Flask project for D-Dagen's website.

## Notes
* Commits pushed to the develop branch show up on [dev.ddagen.se](https://dev.ddagen.se/).
When you're satisfied with the state of the site, create a pull request to update [ddagen.se](https://ddagen.se).
* Sometimes when pushing or merging ddagen.se might look different to your local developement 
environment, this is because the CSS might not have been updated on the server while the HTML has.
Solution? Wait a few hours.

## Instalation
If you're running Windows I can highly recommend Windows Subsystem for Linux (WSL) as it allows you
to run a Linux terminal in Windows. This is helpful as it allows you to gather everything related 
to the development of [ddagen.se](https://ddagen.se/) in one place.

Link to installation  guide: [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

### Install dependencies
To install python 3 and flask run:
```bash
$ sudo apt install python3.9 python3-flask
```

### Run
To start the local development server run:
```
$ flask run
```


# General Guidelines

**NOTE:** I wrote down these guidelines since the repo was a mess previously with very little 
structure. Nothing of the following is set in stone! Feel free to change anything nonsensical or 
make exceptions.

## Responsive Web Design
When designing a feature, design it with mobile first in mind.
Generally this means that you should never set values in pixels or cm, instead use %, em, rem,
vh, and vw, more information can be found [here](https://www.w3schools.com/CSSref/css_units.asp).
Yes, it is more work to design the site responsivley, but it creates a much better user experience.

## CSS

### Organization
It is my belief that the CSS should be divided into files in a logical structure. At the time of
writing there's different files for the header, footer, faq-page, etc. The reason for this is that
most of the CSS for the header has nothing to do with the faq-page and it's therefore pointless to
have them in the same file. A major benefit of this is that if changes need to be made to the
faq-page on mobile there's no need to sift through the footer styling. 

For those thinking about duplication of common stylings, I feel it's better to duplicate it where
it's needed since it creates fewer headaches than when you have one class affecting 15 divs on
three pages.

Within the CSS files the current structure is:
* Variables
* Selectors
* Classes
* ID's
* media querries

This is just to make it easier to find what you're looking for. However, there's times when it is
more logical to put ID's and classes, or ID's and selectors next to each other if they are
related.

### Be specific! 
When styling be specific, try to avoid using general selectors such as "div a" or ".class p ul" 
since it is A), hard to understand which elements are refered to, and B), there's a large risk of it
having unintended side effects. 

Instead use selectors such as id's or classes that are named specifically, e.g. "header-logo-container" 
or "footer-item". It makes it clear what's being refered to and significantly reduces the risk of 
side effects on other elements on the site.


# Style
I'm sure there's something to be said here about how [ddagen.se](https://ddagen.se/) should follow 
Datasektionens style guidelines and whatever, however, I feel that d-dagen is it's own thing and doesn't
need to adhere to all the guidelines. If you feel differently, feel free to change it!

## Colors
| Color             | Code                  | Usecase                                   |
| ----------------- | --------------------- | ----------------------------------------- |
| cerise:           | #e83d84               | used for most things on the page          |
| cerise-light:     | #ec5f99               | used when a different shade is needed     |
| transparent grey: | rgba(52, 52, 52, 0.9) | used for the header and footer background |

## Fonts
| Font      | Link                                                        | Usecase                                 |
| --------- | ----------------------------------------------------------- | --------------------------------------- |
| Lato      | https://fonts.google.com/specimen/Lato?query=lato           | used for most things on the page        |
| Comfortaa | https://fonts.google.com/specimen/Comfortaa?query=comfortaa | the font the d-dagen logo is written in |
