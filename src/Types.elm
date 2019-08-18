module Types exposing (..)

import Navigation exposing (Location)
import Dict exposing (Dict)


type Route
    = AboutRoute
    | WritingRoute
    | PortfolioRoute
    | ReadingListRoute
    | NotFoundRoute


type alias Model =
    { nav : List ( String, Msg, Route )
    , writingLinks : Links
    , projectDescriptions : List Project
    , readingList : ReadingList
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


type alias Title =
    String


type alias Author =
    String


type alias Book =
    ( Title, Author )


type alias BookList =
    List Book


type alias ReadingList =
    Dict Int BookList


type Msg
    = ShowAbout
    | ShowWriting
    | ShowPortfolio
    | ShowReadingList
    | UrlChange Location
