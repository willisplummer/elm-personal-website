module Types exposing (..)

import Navigation exposing (Location)


type Route
    = AboutRoute
    | WritingRoute
    | PortfolioRoute
    | ContactRoute
    | NotFoundRoute


type alias Model =
    { nav : List ( String, Msg )
    , writingLinks : Links
    , projectDescriptions : List Project
    , route : Route
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


type Msg
    = ShowAbout
    | ShowWriting
    | ShowPortfolio
    | ShowContact
    | UrlChange Location
