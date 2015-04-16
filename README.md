# Speed Dating

A desktop app to speed date your tasks. Inspired by the [Get-It-Done Guy's post](http://www.quickanddirtytips.com/productivity/organization/stop-procrastinating-by-speed-dating-your-tasks?page=all) on the topic.

This is a cross-platform [nw.js](https://github.com/nwjs/nw.js) app.

## Downloads

* [Linux 32-bit](https://github.com/thameera/speed-dating/releases/download/v0.1.0/Speed.Dating.Linux.32.zip)
* [Linux 64-bit](https://github.com/thameera/speed-dating/releases/download/v0.1.0/Speed.Dating.Linux.64.zip)
* [OS X](https://github.com/thameera/speed-dating/releases/download/v0.1.0/Speed.Dating.OS.X.zip)
* [Windows](https://github.com/thameera/speed-dating/releases/download/v0.1.0/Speed.Dating.Windows.zip)

## Running from source

First, [download](https://github.com/nwjs/nw.js#downloads) and [set up](https://github.com/nwjs/nw.js/wiki/How-to-run-apps) nw.js.

Clone the repo:

    git clone https://github.com/thameera/speed-dating.git

Install the dependencies

    cd speed-dating
    npm install

Run the app with

    nw src

## Building binaries

This assumes that you have already cloned the repo.

Install `grunt`.

    npm install -g grunt-cli

Run grunt. If you're running this for the first time, it will take some time to download the nw.js binaries for all platforms.

    grunt

This will create the binaries for Linux, OS X and Windows in the `dist/` directory.

## Contributing

Pull requests are always welcome. See the Issues section for a few suggested improvements/bug fixes.

