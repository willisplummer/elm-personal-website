module ModelSpec exposing (spec)

import Data exposing (..)
import Expect exposing (Expectation)
import Model exposing (initialModel)
import Test exposing (..)
import Types exposing (..)


spec : Test
spec =
    describe "Model module"
        [ describe "initialModel"
            [ test "accepts a route and returns the initial state" <|
                \_ ->
                    let
                        expectation =
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
                            , projectDescriptions = projects
                            , route = AboutRoute
                            }

                        result =
                            initialModel AboutRoute
                    in
                        Expect.equal expectation result
            ]
        ]
