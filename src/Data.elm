module Data exposing (..)

import Types exposing (Project)


poetry : List ( String, String )
poetry =
    [ ( "http://www.newestyork.co/14-flossing", "i'm getting into flossing lately (newest york)" )
    , ( "https://ghostcitypress.com/2017-summer-microchap-series/wild-horse-rappers", "wild horse rappers (with precious okoyomon)" )
    , ( "http://muumuuhouse.com/wp.22may2017.html", "10,000 year clock (muumuu house)" )
    , ( "http://www.bodegamag.com/articles/172-bros", "bros (bodega mag)" )
    , ( "http://darkfuckingwizard.com/three-poems/", "3 poems (dark fucking wizard)" )
    , ( "http://muumuuhouse.com/wp.13nov2014.html", "14 haiku (muumuu house)" )
    , ( "https://preludemag.com/contributors/willis-plummer/", "3 poems (prelude magazine)" )
    , ( "http://cwp.fas.nyu.edu/object/cwp.ug.lobelprize_plummer", "good and beautiful (nyu creative writing program)" )
    , ( "http://www.hobartpulp.com/web_features/5-poems--8", "5 poems (hobartpulp)" )
    ]


prose : List ( String, String )
prose =
    [ ( "http://thenervousbreakdown.com/willisplummer/2018/11/two-stories/", "two stories (the nervous breakdown)" )
    , ( "https://thecreativeindependent.com/people/writer-megan-boyle-on-documenting-your-entire-life-in-your-creative-work/", "megan boyle on documenting your entire life in your creative work" )
    , ( "https://thecreativeindependent.com/people/poet-andrew-weatherhead-on-hijacking-language/", "andrew weatherhead on hijacking language" )
    , ( "https://thecreativeindependent.com/people/tao-lin-on-why-he-writes/", "tao lin on why he writes" )
    , ( "https://thecreativeindependent.com/people/precious-okoyomon-on-finding-poetry-in-everything/", "precious okoyomon on finding poetry in everything" )
    , ( "https://medium.com/kickstarter/total-party-kill-3898fb82b5fb#.31wxy6hzl", "total party kill: the architects of dungeons and dragons" )
    , ( "http://thoughtcatalog.com/2013/not-even-doom-music-an-interview-with-mat-riviere/", "not even doom music: an interview with mat riviere" )
    , ( "http://thoughtcatalog.com/2013/an-interview-with-nytyrant-in-four-parts/", "an interview with giancarlo ditrapano" )
    ]


projects : List Project
projects =
    [ { title = "A Colorful Landing Page"
      , description = """
                        A lightweight landing page for any type of project.
                        Mouseover the squares to change their color and shape.
                        I used RXJS for handling navigation and cursor events.
                        """
      , links = [ ( "https://willisplummer.github.io/demo-squares/", "site" ), ( "https://github.com/willisplummer/demo-squares", "github" ) ]
      }
    , { title = "Kickstarter Experts"
      , description = """
                        A standalone page for Kickstarter's Experts program.
                        Implemented in React with atomic classes generated via SCSS.
                        The list of Experts is sourced from a Rails controller.
                      """
      , links = [ ( "https://www.kickstarter.com/experts", "site" ) ]
      }
    , { title = "This Portfolio Site"
      , description = """
                        This single-page portfolio site was built using Elm.
                        It implements the Navigation and URLparser packages to handle routing.
                        """
      , links = [ ( "https://github.com/willisplummer/elm-personal-website", "github" ) ]
      }
    , { title = "MTA Bus Times App for Amazon Echo"
      , description = """
                        This ruby app runs on Sinatra and enables the Amazon Echo to
                        let you know when the next bus will arrive via the MTA's Bus Time API.
                        """
      , links = [ ( "https://github.com/willisplummer/mta_alexa_app", "github" ) ]
      }
    , { title = "Western Beefs of North America"
      , description = """
                        This is a poetry and prose website that I edited in 2014 and 2015.
                        I built a Rails CMS to simplify the process of adding new content.
                        """
      , links = [ ( "http://westernbeefs.com/", "site" ), ( "https://github.com/willisplummer/westernbeefs", "github" ) ]
      }
    ]
