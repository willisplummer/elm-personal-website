module Main exposing (..)

import Navigation exposing (..)
import Routing exposing (..)
import Models exposing (..)
import Update exposing (..)
import Messages exposing (..)
import Views exposing (..)


-- Main


main : Program Never
main =
    Navigation.program Routing.parser
        { init = init
        , view = view
        , update = update
        , urlUpdate = urlUpdate
        , subscriptions = subscriptions
        }



-- Init


init : Result String Route -> ( Model, Cmd Msg )
init result =
    let
        currentRoute =
            routeFromResult result
    in
        ( initialModel currentRoute, Cmd.none )



-- urlUpdate


urlUpdate : Result String Route -> Model -> ( Model, Cmd Msg )
urlUpdate result model =
    let
        currentRoute =
            Routing.routeFromResult result
    in
        ( { model | route = currentRoute }, Cmd.none )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
