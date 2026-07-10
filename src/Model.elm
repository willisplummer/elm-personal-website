module Model exposing (..)

import Browser.Navigation exposing (Key)
import Data exposing (mkReadingList, poetry, projects, prose)
import Routing exposing (parseUrl)
import Types exposing (..)
import Url exposing (Url)


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
