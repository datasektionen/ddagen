from xml.dom import minidom



if __name__ == '__main__':
  with open('assets/map.svg') as svg_file:
    doc = minidom.parse(svg_file)
    for el in doc.getElementsByTagName('tspan'):
      print(el.toprettyxml())

    doc.unlink()