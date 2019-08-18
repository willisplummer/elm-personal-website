module Routing exposing (..)

import Navigation exposing (Location)
import Types exposing (..)
import UrlParser exposing (Parser, map, parseHash, s, top)


parseUrl : Location -> Route
parseUrl location =
    let
        parsedURL =
            parseHash route location
    in
        Maybe.withDefault NotFoundRoute parsedURL


route : Parser (Route -> a) a
route =
    UrlParser.oneOf
        [ map AboutRoute top
        , map AboutRoute (s "about")
        , map WritingRoute (s "writing")
        , map PortfolioRoute (s "projects")
        , map PortfolioRoute (s "portfolio")
        , map ReadingListRoute (s "reading-list")
        ]
