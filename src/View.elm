module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.A11y exposing (pressed)
import Html.Events exposing (..)
import Types exposing (..)


view : Model -> Html Msg
view model =
    div
        []
        [ headerNav model
        , content model
        ]


headerNav : Model -> Html Msg
headerNav model =
    let
        navItemClass =
            \bool ->
                if bool then
                    "active"
                else
                    ""
    in
        header []
            [ h1 [] [ text "Willis Plummer" ]
            , nav []
                (List.intersperse (text " | ")
                    (List.concatMap (\( description, msg, route ) -> [ button [ type_ "button", onClick msg, pressed <| Just (model.route == route), class (navItemClass (model.route == route)) ] [ text description ] ]) model.nav)
                )
            ]


content : Model -> Html Msg
content model =
    case model.route of
        AboutRoute ->
            div [ class "content" ]
                [ p [] [ text "Hi, I'm Willis. I'm a software engineer based in Brooklyn." ]
                , p []
                    [ text "I work at "
                    , a [ href "https://www.hiclark.com/" ] [ text "Hi Clark" ]
                    , text "."
                    ]
                , p []
                    [ text "Previously, I freelanced with "
                    , a [ href "https://computerlab.io/" ] [ text "Computer Lab" ]
                    , text " and worked on the front-end team at "
                    , a [ href "https://kickstarter.com" ] [ text "Kickstarter" ]
                    , text "."
                    ]
                , p []
                    [ text "I sometimes do interviews for "
                    , a [ href "https://thecreativeindependent.com/" ] [ text "The Creative Independent" ]
                    , text "."
                    ]
                ]

        WritingRoute ->
            div [ class "content" ]
                [ p [] [ text "Poetry:" ]
                , ul [ class "writing-list" ]
                    (List.concatMap
                        (\( url, description ) -> [ li [] [ a [ href url ] [ text description ] ] ])
                        model.writingLinks.poetryLinks
                    )
                , p [] [ text "Prose:" ]
                , ul [ class "writing-list" ]
                    (List.concatMap
                        (\( url, description ) -> [ li [] [ a [ href url ] [ text description ] ] ])
                        model.writingLinks.proseLinks
                    )
                ]

        PortfolioRoute ->
            div [ class "content" ]
                (List.concatMap
                    showProject
                    model.projectDescriptions
                )

        ContactRoute ->
            div [ class "content" ]
                [ p []
                    [ text "You can find me on "
                    , a [ href "https://github.com/willisplummer" ] [ text "Github" ]
                    , text ", "
                    , a [ href "https://twitter.com/willisplummer" ] [ text "Twitter" ]
                    , text ", and "
                    , a [ href "https://www.linkedin.com/in/willisplummer" ] [ text "LinkedIn" ]
                    ]
                , p []
                    [ text "But "
                    , a [ href "mailto:willisplummer@gmail.com" ] [ text "Email" ]
                    , text " is the best way to get in touch."
                    ]
                ]

        NotFoundRoute ->
            div [ class "content" ] [ text "NOT FOUND" ]


showProject : Project -> List (Html Msg)
showProject project =
    [ div [ class "project" ]
        [ div [ class "project-content" ]
            [ h2 []
                [ text project.title ]
            , p []
                [ text project.description ]
            , p []
                (List.concatMap
                    (\( url, description ) -> [ text "(", a [ href url ] [ text description ], text ")" ])
                    project.links
                )
            ]
        ]
    ]
