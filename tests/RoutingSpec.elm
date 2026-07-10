module RoutingSpec exposing (spec)

import Expect
import Routing exposing (parseUrl)
import Test exposing (..)
import Types exposing (Route(..))
import Url exposing (Protocol(..), Url)


{-| The app routes off the URL fragment (e.g. `willisplummer.com/#writing`),
so each case is just a fragment fed through `parseUrl`.
-}
urlWithFragment : Maybe String -> Url
urlWithFragment fragment =
    { protocol = Https
    , host = "willisplummer.com"
    , port_ = Nothing
    , path = "/"
    , query = Nothing
    , fragment = fragment
    }


spec : Test
spec =
    describe "Routing.parseUrl"
        [ test "no fragment routes home (About)" <|
            \_ ->
                parseUrl (urlWithFragment Nothing)
                    |> Expect.equal AboutRoute
        , test "#about -> AboutRoute" <|
            \_ ->
                parseUrl (urlWithFragment (Just "about"))
                    |> Expect.equal AboutRoute
        , test "#writing -> WritingRoute" <|
            \_ ->
                parseUrl (urlWithFragment (Just "writing"))
                    |> Expect.equal WritingRoute
        , test "#projects -> PortfolioRoute" <|
            \_ ->
                parseUrl (urlWithFragment (Just "projects"))
                    |> Expect.equal PortfolioRoute
        , test "#portfolio -> PortfolioRoute" <|
            \_ ->
                parseUrl (urlWithFragment (Just "portfolio"))
                    |> Expect.equal PortfolioRoute
        , test "#reading-list -> ReadingListRoute" <|
            \_ ->
                parseUrl (urlWithFragment (Just "reading-list"))
                    |> Expect.equal ReadingListRoute
        , test "an unrecognized fragment -> NotFoundRoute" <|
            \_ ->
                parseUrl (urlWithFragment (Just "nonsense"))
                    |> Expect.equal NotFoundRoute
        ]
