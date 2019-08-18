module UpdateSpec exposing (spec)

import Expect exposing (Expectation)
import Model exposing (initialModel)
import Navigation exposing (modifyUrl)
import Test exposing (..)
import Types exposing (..)
import Update exposing (update)


spec : Test
spec =
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
                            ( model, Navigation.modifyUrl "#reading-list" )

                        result =
                            update ShowReadingList model
                    in
                        Expect.equal expectation result
            ]
        , describe "with UrlChange msg"
            [ test "returns the correct state and side effects" <|
                \_ ->
                    let
                        location =
                            { href = ""
                            , host = ""
                            , hostname = ""
                            , protocol = ""
                            , origin = ""
                            , port_ = ""
                            , pathname = ""
                            , search = ""
                            , hash = "#about"
                            , username = ""
                            , password = ""
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
