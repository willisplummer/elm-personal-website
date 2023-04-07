module Routing exposing (..)

-- import Browser.Navigation exposing (Key)
import Types exposing (Route(..))
import Url exposing (Url)
import Url.Parser exposing (Parser, parse, map, fragment, s, top, oneOf)

parseUrl url =
    -- Treat fragment as path
    { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
      |> parse route
      |> Maybe.withDefault NotFoundRoute

-- parseUrl : Url -> Maybe(string)
-- parseUrl location =
--     let
--         parsedUrl : Maybe(Maybe(String))
--         parsedUrl =
--             (parse (fragment route)) location
--     in
--         case parsedUrl of
--             Just x ->
--                 x
--             Just Nothing ->
--                 NotFoundRoute
--             Nothing ->
--                 NotFoundRoute

route : Parser (Route -> a) a
route =
    oneOf
        [ map AboutRoute top
        , map AboutRoute (s "about")
        , map WritingRoute (s "writing")
        , map PortfolioRoute (s "projects")
        , map PortfolioRoute (s "portfolio")
        , map ReadingListRoute (s "reading-list")
        ]
