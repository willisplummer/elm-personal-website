module MainTest exposing (..)

import Basics exposing (toString)
import Expect exposing (Expectation)
import Main exposing (..)
import Navigation exposing (modifyUrl)
import Test exposing (..)


suite : Test
suite =
    describe "the Main module"
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
                            , route = Main.AboutRoute
                            }

                        result =
                            initialModel Main.AboutRoute
                    in
                    Expect.equal expectation result
            ]
        , describe "update"
            [ describe "with ShowAbout msg"
                [ test "returns the correct state and side effects" <|
                    \_ ->
                        let
                            model =
                                initialModel Main.WritingRoute

                            expectation =
                                ( model, Navigation.modifyUrl "#about" )

                            result =
                                update ShowAbout model
                        in
                        Expect.equal expectation result
                ]
            , describe "with ShowWriting msg"
                [ test "returns the correct state and side effects" <|
                    \_ ->
                        let
                            model =
                                initialModel Main.WritingRoute

                            expectation =
                                ( model, Navigation.modifyUrl "#writing" )

                            result =
                                update ShowWriting model
                        in
                        Expect.equal expectation result
                ]
            , describe "with ShowPortfolio msg"
                [ test "returns the correct state and side effects" <|
                    \_ ->
                        let
                            model =
                                initialModel Main.WritingRoute

                            expectation =
                                ( model, Navigation.modifyUrl "#portfolio" )

                            result =
                                update ShowPortfolio model
                        in
                        Expect.equal expectation result
                ]
            , describe "with ShowContact msg"
                [ test "returns the correct state and side effects" <|
                    \_ ->
                        let
                            model =
                                initialModel Main.WritingRoute

                            expectation =
                                ( model, Navigation.modifyUrl "#contact" )

                            result =
                                update ShowContact model
                        in
                        Expect.equal expectation result
                ]
            , describe "with UrlChange msg"
                [ test "returns the correct state and side effects" <|
                    \_ ->
                        let
                            location =
                                { href = "jkjkjk"
                                , host = "jkjkjk"
                                , hostname = "jkjkjk"
                                , protocol = "jkjkjk"
                                , origin = "jkjkjk"
                                , port_ = "jkjkjk"
                                , pathname = "jkjkjk"
                                , search = "jkjkjk"
                                , hash = "#about"
                                , username = "jkjkjk"
                                , password = "jkjkjk"
                                }

                            model =
                                initialModel Main.WritingRoute

                            expectation =
                                ( { model | route = Main.AboutRoute }, Cmd.none )

                            result =
                                update (UrlChange location) model
                        in
                        Expect.equal expectation result
                ]
            ]
        ]
