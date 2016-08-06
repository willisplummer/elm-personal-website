module Models exposing (..)

import Routing exposing (..)
import Messages exposing (..)


type alias Model =
    { nav : List ( String, Msg )
    , writingLinks : Links
    , route : Routing.Route
    }


type alias Links =
    { poetryLinks : List ( String, String )
    , proseLinks : List ( String, String )
    , miscLinks : List ( String, String )
    }


initialModel : Routing.Route -> Model
initialModel route =
    { nav =
        [ ( "About", ShowAbout )
        , ( "Writing", ShowWriting )
        , ( "Portfolio", ShowPortfolio )
        , ( "Contact", ShowContact )
        ]
    , writingLinks =
        { poetryLinks = poetry
        , proseLinks = prose
        , miscLinks = misc
        }
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
