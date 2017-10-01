module ModelTest exposing (..)

import Data exposing (..)
import Expect exposing (Expectation)
import Model exposing (initialModel)
import Test exposing (..)
import Types exposing (..)


modelSuite : Test
modelSuite =
    describe "Model module"
        [ describe "initialModel"
            [ test "accepts a route and returns the initial state" <|
                \_ ->
                    let
                        expectation =
                            { nav =
                                [ ( "About", ShowAbout )
                                , ( "Writing", ShowWriting )
                                , ( "Projects", ShowPortfolio )
                                , ( "Contact", ShowContact )
                                ]
                            , writingLinks =
                                { poetryLinks = poetry
                                , proseLinks = prose
                                , miscLinks = misc
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
