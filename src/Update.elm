module Update exposing (..)

import Navigation exposing (modifyUrl)
import Routing exposing (parseUrl)
import Types exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ShowAbout ->
            ( model, modifyUrl "#about" )

        ShowWriting ->
            ( model, modifyUrl "#writing" )

        ShowPortfolio ->
            ( model, modifyUrl "#portfolio" )

        ShowReadingList ->
            ( model, modifyUrl "#reading-list" )

        UrlChange location ->
            let
                currentRoute =
                    parseUrl location
            in
                ( { model | route = currentRoute }, Cmd.none )
