module Update exposing (..)

import Models exposing (Model)
import Messages exposing (Msg(..))
import Navigation exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ShowAbout ->
            ( model, Navigation.modifyUrl "#about" )

        ShowWriting ->
            ( model, Navigation.modifyUrl "#writing" )

        ShowPortfolio ->
            ( model, Navigation.modifyUrl "#portfolio" )

        ShowContact ->
            ( model, Navigation.modifyUrl "#contact" )
