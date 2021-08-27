# D-Dagen
Flask project for D-Dagen's website.

## General Guidelines

### Responsive Web Design
When designing a feature, design it with mobile first in mind.
Generally this means that you should never set values in pixels or cm, instead use %, em, rem, vh, and vw, more information can be found [here](https://www.w3schools.com/CSSref/css_units.asp). Yes, it is more work to design the site responsivley, but it creates a much better user experience.


## Style

### Colors
| Color             | Code                  | Usecase                                   |
| ----------------- | --------------------- | ----------------------------------------- |
| cerise:           | #e83d84               | used for most things on the page          |
| cerise-light:     | #ec5f99               | used when a different shade is needed     |
| transparent grey: | rgba(69, 69, 69, 0.8) | used for the header and footer background |

### Fonts
| Font      | Link                                                        | Usecase                                 |
| --------- | ----------------------------------------------------------- | --------------------------------------- |
| Comfortaa | https://fonts.google.com/specimen/Lato?query=lato           | used for most things on the page        |
| Comfortaa | https://fonts.google.com/specimen/Comfortaa?query=comfortaa | the font the d-dagen logo is written in |


## Setup
If you're running Windows I can highly recommend Windows Subsystem for Linux (WSL) as
it allows you to run a Linux terminal in Windows. This can be of tremendous help as it allows you to gather everything related to the development of [ddagen.se](https://ddagen.se/) in one place (git, React, Flask).

Link to installation  guide: [https://docs.microsoft.com/en-us/windows/wsl/install-win10](https://docs.microsoft.com/en-us/windows/wsl/install-win10).


## Install dependencies
```
$ pipenv install
```

## Run

```
$ flask run
```
