# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20131114204708) do

  create_table "game_officers", :force => true do |t|
    t.string   "surname"
    t.string   "given_name"
    t.string   "dream"
    t.integer  "ruler_id"
    t.integer  "game_province_id"
    t.integer  "war"
    t.integer  "leadership"
    t.integer  "intelligence"
    t.integer  "politics"
    t.integer  "charm"
    t.integer  "loyalty"
    t.datetime "created_at",       :null => false
    t.datetime "updated_at",       :null => false
    t.integer  "game_id"
    t.string   "avatar"
  end

  add_index "game_officers", ["game_id"], :name => "game_id_ix"

  create_table "game_provinces", :force => true do |t|
    t.string   "name"
    t.integer  "advisor_id"
    t.integer  "prefect_id"
    t.integer  "ruler_id"
    t.integer  "gold"
    t.integer  "rice"
    t.integer  "tax"
    t.integer  "safety"
    t.integer  "land"
    t.integer  "earthquake"
    t.integer  "fire"
    t.integer  "flood"
    t.integer  "commerce"
    t.integer  "troops"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "game_id"
    t.integer  "population"
  end

  add_index "game_provinces", ["game_id"], :name => "game_id_ix"

  create_table "games", :force => true do |t|
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "officers", :force => true do |t|
    t.string   "surname"
    t.string   "given_name"
    t.string   "dream"
    t.integer  "ruler_id"
    t.integer  "province_id"
    t.integer  "war"
    t.integer  "leadership"
    t.integer  "intelligence"
    t.integer  "politics"
    t.integer  "charm"
    t.integer  "loyalty"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.string   "avatar"
  end

  create_table "provinces", :force => true do |t|
    t.string   "name"
    t.integer  "advisor_id"
    t.integer  "prefect_id"
    t.integer  "ruler_id"
    t.integer  "gold"
    t.integer  "rice"
    t.integer  "tax"
    t.integer  "safety"
    t.integer  "land"
    t.integer  "earthquake"
    t.integer  "fire"
    t.integer  "flood"
    t.integer  "commerce"
    t.integer  "troops"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "population"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.integer  "game_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
