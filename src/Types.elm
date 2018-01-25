module Types exposing (..)

import Navigation exposing (Location)


type Route
    = AboutRoute
    | WritingRoute
    | PortfolioRoute
    | ContactRoute
    | NotFoundRoute


type alias Model =
    { nav : List ( String, Msg, Route )
    , writingLinks : Links
    , projectDescriptions : List Project
    , route : Route
    }


type alias LinksList =
    List ( String, String )


type alias Links =
    { poetryLinks : LinksList
    , proseLinks : LinksList
    }


type alias Project =
    { title : String
    , description : String
    , links : LinksList
    }


type Msg
    = ShowAbout
    | ShowWriting
    | ShowPortfolio
    | ShowContact
    | UrlChange Location
