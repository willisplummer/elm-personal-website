module Update exposing (..)

import Browser
import Browser.Navigation as Nav exposing (pushUrl)
import Routing exposing (parseUrl)
import Url.Builder exposing (relative)
import Types exposing (..)
import Url

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

        LinkClicked urlRequest ->
           case urlRequest of
                Browser.Internal url ->
                  ( model, pushUrl model.key (Url.toString url) )

                Browser.External href ->
                  ( model, Nav.load href )

        UrlChange location ->
            let
                currentRoute =
                    parseUrl location
            in
                ( { model | route = currentRoute }, Cmd.none )
