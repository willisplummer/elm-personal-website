module Models exposing (..)

import Routing exposing (..)
import Messages exposing (..)


type alias Model =
    { nav : List ( String, Msg )
    , writingLinks : Links
    , projectDescriptions : List (Project)
    , route : Routing.Route
    }


type alias Links =
    { poetryLinks : List ( String, String )
    , proseLinks : List ( String, String )
    , miscLinks : List ( String, String )
    }


type alias Project =
    { title : String
    , description : String
    , links : List ( String, String )
    }


initialModel : Routing.Route -> Model
initialModel route =
    { nav =
        [ ( "About", ShowAbout )
        , ( "Writing", ShowWriting )
        , ( "Projects", ShowPortfolio )
        , ( "Contact", ShowContact )
        ]
    , writingLinks =
        { poetryLinks = poetry
        , proseLinks = prose
        , miscLinks = misc
        }
    , projectDescriptions = projects
    , route = route
    }


poetry : List ( String, String )
poetry =
    [ ( "http://www.bodegamag.com/articles/172-bros", "bros (bodega mag)" )
    , ( "http://darkfuckingwizard.com/three-poems/", "3 poems (dark fucking wizard)" )
    , ( "http://muumuuhouse.com/wp.13nov2014.html", "14 haiku (muumuu house)" )
    , ( "https://preludemag.com/contributors/willis-plummer/", "3 poems (prelude magazine)" )
    , ( "http://cwp.fas.nyu.edu/object/cwp.ug.lobelprize_plummer", "good and beautiful (nyu creative writing program)" )
    , ( "http://www.hobartpulp.com/web_features/5-poems--8", "5 poems (hobartpulp)" )
    ]


prose : List ( String, String )
prose =
    [ ( "https://medium.com/kickstarter/total-party-kill-3898fb82b5fb#.31wxy6hzl", "total party kill: the architects of dungeons and dragons" )
    , ( "http://thoughtcatalog.com/2013/not-even-doom-music-an-interview-with-mat-riviere/", "not even doom music: an interview with mat riviere" )
    , ( "http://thoughtcatalog.com/2013/an-interview-with-nytyrant-in-four-parts/", "an interview with giancarlo ditrapano" )
    , ( "http://thoughtcatalog.com/2012/my-tweets-almost-got-me-sent-home-from-study-abroad/", "my tweets almost got me sent home from study abroad" )
    ]


misc : List ( String, String )
misc =
    [ ( "http://dadsofshutterstock.tumblr.com", "dads of shutterstock" )
    , ( "http://twitter.com/willisunedited", "@willisunedited" )
    , ( "http://twitter.com/willisdepressed", "@willisdepressed" )
    , ( "http://muumuuhouse.com/wp.twitter1.2012.html", "selections from willis plummer's twitter (edited by mira gonzalez)" )
    , ( "http://muumuuhouse.com/vt.twitter.2012-13.html", "selections from victoria trott's twitter (edited by willis plummer)" )
    ]


projects : List (Project)
projects =
    [ { title = "This Portfolio Site"
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
