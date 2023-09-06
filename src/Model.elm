module Model exposing (..)

import Data exposing (poetry, projects, prose, mkReadingList)
import Url exposing (Url)
import Routing exposing (parseUrl)
import Types exposing (..)
import Browser.Navigation exposing (Key)

init : String -> Url -> Key -> ( Model, Cmd Msg )
init ymlReadingList url key =
    ( initialModel ymlReadingList (parseUrl url) key
    , Cmd.none
    )

initialModel : String -> Route -> Key -> Model
initialModel ymlReadingList route key =
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
    , readingList = mkReadingList ymlReadingList 
    , projectDescriptions = projects
    , route = route
    , key = key
    }
