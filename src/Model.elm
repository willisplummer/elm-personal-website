module Model exposing (..)

import Data exposing (poetry, projects, prose, reading)
import Url exposing (Url)
import Routing exposing (parseUrl)
import Types exposing (..)
import Browser.Navigation exposing (Key)

init : flags -> Url -> Key -> ( Model, Cmd Msg )
init flags url key =
    ( initialModel (parseUrl url) key
    , Cmd.none
    )


initialModel : Route -> Key -> Model
initialModel route key =
    { nav =
        [ ( "About", ShowAbout, AboutRoute )
        , ( "Writing", ShowWriting, WritingRoute )
        , ( "Reading", ShowReadingList, ReadingListRoute )
        , ( "Projects", ShowPortfolio, PortfolioRoute )
        ]
    , writingLinks =
        { poetryLinks = poetry
        , proseLinks = prose
        }
    , readingList = reading
    , projectDescriptions = projects
    , route = route
    , key = key
    }
