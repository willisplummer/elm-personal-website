module Example exposing (..)

import Basics exposing (toString)
import Expect exposing (Expectation)
import Test exposing (..)


suite : Test
suite =
    describe "testing!"
        [ test "has no effect on a palindrome" <|
            \_ ->
                let
                    palindrome =
                        "hannah"
                in
                Expect.equal palindrome (String.reverse palindrome)
        , test "matches snapshot" <|
            \_ ->
                let
                    snapshot =
                        toString "hannah"

                    reference =
                        toString <| String.reverse "hannah"
                in
                Expect.equal snapshot reference
        ]
