module UpdateTest exposing (..)

import Expect exposing (Expectation)
import Model exposing (initialModel)
import Navigation exposing (modifyUrl)
import Test exposing (..)
import Types exposing (..)
import Update exposing (update)


updateSuite : Test
updateSuite =
    describe "update"
        [ describe "with ShowAbout msg"
            [ test "returns the correct state and side effects" <|
                \_ ->
                    let
                        model =
                            initialModel WritingRoute

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
                            initialModel WritingRoute

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
                            initialModel WritingRoute

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
                            initialModel WritingRoute

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
                            initialModel WritingRoute

                        expectation =
                            ( { model | route = AboutRoute }, Cmd.none )

                        result =
                            update (UrlChange location) model
                    in
                    Expect.equal expectation result
            ]
        ]
