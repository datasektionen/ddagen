![d-dagen](https://github.com/datasektionen/ddagen/blob/develop/static/img/assets/d-dagen-logo-ny.svg)
Flask project for D-Dagen's website.

# Notes
* Look at the [wiki](https://github.com/datasektionen/ddagen/wiki) for more information about the different features of [ddagen.se](https://ddagen.se)! 
While you're there make sure to contribute some information and documentation about new (and old) features. 
* Commits pushed to the develop branch show up on [dev.ddagen.se](https://dev.ddagen.se/).
When you're satisfied with the state of the site, create a pull request to update [ddagen.se](https://ddagen.se).
* Sometimes when pushing or merging ddagen.se might look different to your local developement 
environment, this is because the CSS might not have been updated on the server while the HTML has.
Solution? Wait a few hours.
* [layout.html](https://github.com/datasektionen/ddagen/blob/develop/templates/layout.html) is the "main" page, i.e. the page into which the other content is inserted.
* The reason the background for (ddagen.se/companies)[https://ddagen.se/companies] is white at first is because it has to wait for all the company logos to load before it loads the background. Currently some of the company logos are very large (some are like 5000px wide and 3000px high), so keep in mind to have smaller sizes for logos in the future.
* If you include "fixes #XX" or "closes #XX" (where #XX is the issue number) the coresponding issue is automatically closed.   

# Instalation
If you're running Windows I can highly recommend Windows Subsystem for Linux (WSL) as it allows you
to run a Linux terminal in Windows. This is helpful as it allows you to gather everything related 
to the development of [ddagen.se](https://ddagen.se/) in one place.

Link to installation  guide: [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

## Install dependencies
To install python 3 and flask run:
```bash
$ sudo apt install python3.9 python3-flask
```

## Run
To start the local development server run:
```
$ flask run
```
