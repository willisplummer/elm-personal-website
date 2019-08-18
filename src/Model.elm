module Model exposing (..)

import Data exposing (poetry, projects, prose, reading)
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
        [ ( "About", ShowAbout, AboutRoute )
        , ( "Writing", ShowWriting, WritingRoute )
        , ( "Projects", ShowPortfolio, PortfolioRoute )
        , ( "Reading", ShowReadingList, ReadingListRoute )
        ]
    , writingLinks =
        { poetryLinks = poetry
        , proseLinks = prose
        }
    , readingList = reading
    , projectDescriptions = projects
    , route = route
    }
