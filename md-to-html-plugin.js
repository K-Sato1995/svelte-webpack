/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const marked = require('marked')

const MARKDOWN_FILE_DIR = 'content'

const markdownFilesData = fs.readdirSync(MARKDOWN_FILE_DIR)
    .filter(filename => /\.md$/.test(filename))
    .map(filename => {
        return {
            markdown: fs.readFileSync(path.join(MARKDOWN_FILE_DIR, filename), 'utf8').toString(),
            filename,
        }
    })
	
const makeHtmlConfig = ({ filename, markdown }) => {
  const name = path.parse(filename).name
  return new HtmlWebpackPlugin({
    template: 'template/index.html',
    cache: true,
    chunks: ['main'],
    values: {
      title: name,
      bodyContent: marked.parse(markdown),
    },    
    filename: `pages/${name}.html`,
  })
}

module.exports = {
  markdownFilesData,
  makeHtmlConfig
}

