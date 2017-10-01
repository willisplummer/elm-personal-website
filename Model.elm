module Model exposing (..)

import Data exposing (misc, poetry, projects, prose)
import Navigation exposing (Location)
import Routing exposing (parseUrl)
import Types exposing (..)


init : Location -> ( Model, Cmd Msg )
init location =
    ( initialModel (parseUrl location)
    , Cmd.none
    )


initialModel : Route -> Model
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
