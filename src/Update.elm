module Update exposing (..)

import Browser.Navigation exposing (pushUrl)
import Routing exposing (parseUrl)
import Url.Builder exposing (relative)
import Types exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ShowAbout ->
            ( model, pushUrl model.key "#about" )

        ShowWriting ->
            ( model, pushUrl model.key "#writing")

        ShowPortfolio ->
            ( model, pushUrl model.key "#portfolio" )

        ShowReadingList ->
            ( model, pushUrl model.key "#reading-list" )

        Noop ->
            ( model, Cmd.none )

        UrlChange location ->
            let
                currentRoute =
                    parseUrl location
            in
                ( { model | route = currentRoute }, Cmd.none )
