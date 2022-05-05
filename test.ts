#!/usr/bin/env -S deno run -A

import {
  readerFromStreamReader,
} from "https://deno.land/std@0.138.0/streams/conversion.ts";
import { SAXParser } from "https://deno.land/x/xmlp@v0.2.9/mod.ts";

const file = await Deno.open("0.xml");

const inputReader = await readerFromStreamReader(
  file.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextEncoderStream())
    .getReader(),
);
await new SAXParser().parse(inputReader);
